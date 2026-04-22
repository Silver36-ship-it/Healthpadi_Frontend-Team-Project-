import { useSearchParams, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flag, ArrowLeft, ShieldCheck, Loader2 } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatNGN } from "@/lib/mockData";
import { api, Facility } from "@/lib/api";
import { toast } from "sonner";

export default function ReportPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const presetFacility = params.get("facility") || "";

  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [procedures, setProcedures] = useState<any[]>([]);

  const [facilityId, setFacilityId] = useState(presetFacility);
  const [procedureName, setProcedureName] = useState("");
  const [chargedPrice, setChargedPrice] = useState("");
  const [notes, setNotes] = useState("");
  
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingProcedures, setLoadingProcedures] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.getFacilities().then(data => {
      setFacilities(data);
      if (!presetFacility && data.length > 0) {
        setFacilityId(data[0].facility_id.toString());
      }
      setLoadingInitial(false);
    }).catch(err => {
      toast.error("Failed to load facilities");
      setLoadingInitial(false);
    });
  }, [presetFacility]);

  useEffect(() => {
    if (!facilityId) {
       setProcedures([]);
       return;
    }
    setLoadingProcedures(true);
    api.getFacilityPricing(facilityId).then(data => {
      setProcedures(data);
      setProcedureName("");
    }).catch(err => {
      toast.error("Failed to load procedures for this facility");
    }).finally(() => {
      setLoadingProcedures(false);
    });
  }, [facilityId]);

  const facility = useMemo(() => facilities.find(f => f.facility_id.toString() === facilityId), [facilities, facilityId]);
  const selectedProc = procedures.find((p) => p.procedure_name === procedureName);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProc || !chargedPrice) {
      toast.error("Please complete all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await api.submitReport({
         facility: Number(facilityId),
         procedure_name: procedureName,
         price: chargedPrice
      });
      toast.success("Report submitted. We'll review within 48 hours.");
      navigate("/facilities");
    } catch (err) {
      toast.error("Failed to submit report. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const difference = selectedProc && chargedPrice ? Number(chargedPrice) - selectedProc.price : 0;

  if (loadingInitial) {
     return <PageShell><div className="container py-20 flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div></PageShell>;
  }

  return (
    <PageShell withMesh>
      <div className="container max-w-3xl pt-10 pb-16">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-warning-soft flex items-center justify-center">
              <Flag className="h-5 w-5 text-warning" />
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight">Transparency Report</h1>
          </div>
          <p className="text-muted-foreground">Help others avoid surprise bills. All reports are reviewed before publication.</p>
        </motion.div>

        <form onSubmit={submit} className="mt-8 glass rounded-3xl p-6 md:p-8 shadow-elevated space-y-6">
          <div className="space-y-2">
            <Label>Facility</Label>
            <select
              value={facilityId}
              onChange={(e) => { setFacilityId(e.target.value); setProcedureId(""); }}
              className="w-full h-11 px-3 rounded-md border border-input bg-background"
            >
              {facilities.map((f) => (
                <option key={f.facility_id} value={f.facility_id}>{f.facility_name} — {f.facility_city}</option>
              ))}
            </select>
            {facility?.is_verified && (
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <ShieldCheck className="h-3 w-3" /> Verified facility
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Procedure</Label>
            <select
              value={procedureName}
              onChange={(e) => setProcedureName(e.target.value)}
              className="w-full h-11 px-3 rounded-md border border-input bg-background"
              required
              disabled={loadingProcedures}
            >
              <option value="">{loadingProcedures ? "Loading procedures..." : "Select a procedure"}</option>
              {procedures.map((p) => (
                <option key={p.id} value={p.procedure_name}>{p.procedure_name} — {formatNGN(p.price)}</option>
              ))}
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Advertised price</Label>
              <Input value={selectedProc ? formatNGN(selectedProc.price) : ""} disabled className="h-11 bg-muted" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="charged">Charged price (₦) *</Label>
              <Input
                id="charged"
                type="number"
                value={chargedPrice}
                onChange={(e) => setChargedPrice(e.target.value)}
                placeholder="e.g. 24000"
                className="h-11"
                required
              />
            </div>
          </div>

          {difference > 0 && (
            <div className="rounded-xl bg-warning-soft border border-warning/30 p-4 flex items-center justify-between">
              <span className="text-sm text-warning-foreground">Overcharge detected</span>
              <span className="font-display font-bold text-lg text-warning">+{formatNGN(difference)}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">Additional notes</Label>
            <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any context or receipt details..." rows={4} />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit" className="shadow-soft" disabled={submitting || loadingProcedures}>
              {submitting ? "Submitting..." : "Submit report"}
            </Button>
          </div>
        </form>
      </div>
    </PageShell>
  );
}
