import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { Loader2 } from "lucide-react";

function VoteForm() {
  const [projectId, setProjectId] = useState("");
  const [milestoneId, setMilestoneId] = useState("");
  const [approve, setApprove] = useState("approve");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/projects/vote",
        {
          projectId,
          milestoneId,
          approve: approve === "approve",
        }
      );
      alert("Vote successful: " + response.data.transactionHash);
    } catch (error) {
      alert("Error voting: " + error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vote on a Milestone</CardTitle>
        <CardDescription>Approve or reject a project milestone</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="voteProjectId">Project ID</Label>
            <Input
              id="voteProjectId"
              placeholder="Project ID"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="milestoneId">Milestone ID</Label>
            <Input
              id="milestoneId"
              type="number"
              placeholder="Milestone ID"
              value={milestoneId}
              onChange={(e) => setMilestoneId(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Vote</Label>
            <RadioGroup value={approve} onValueChange={setApprove}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="approve" id="approve" />
                <Label htmlFor="approve">Approve</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="reject" id="reject" />
                <Label htmlFor="reject">Reject</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Voting...
              </>
            ) : (
              "Vote"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default VoteForm;
