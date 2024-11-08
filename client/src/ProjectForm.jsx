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
import axios from "axios";
import { Plus, Loader2 } from "lucide-react";

function ProjectForm() {
  const [title, setTitle] = useState("");
  const [milestones, setMilestones] = useState([
    { description: "", amount: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddMilestone = () => {
    setMilestones([...milestones, { description: "", amount: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const milestoneDescriptions = milestones.map((m) => m.description);
    const milestoneAmounts = milestones.map((m) => parseFloat(m.amount));
    try {
      const response = await axios.post(
        "http://localhost:5000/api/projects/create",
        {
          title,
          milestoneDescriptions,
          milestoneAmounts,
        }
      );
      alert("Project created successfully: " + response.data.transactionHash);
    } catch (error) {
      alert("Error creating project: " + error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Project</CardTitle>
        <CardDescription>Set up a new crowdfunding project</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectTitle">Project Title</Label>
            <Input
              id="projectTitle"
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          {milestones.map((milestone, index) => (
            <div key={index} className="space-y-2">
              <Label htmlFor={`milestone-${index}`}>
                Milestone {index + 1}
              </Label>
              <Input
                id={`milestone-${index}`}
                placeholder="Milestone Description"
                value={milestone.description}
                onChange={(e) => {
                  const updatedMilestones = [...milestones];
                  updatedMilestones[index].description = e.target.value;
                  setMilestones(updatedMilestones);
                }}
                required
              />
              <Input
                type="number"
                placeholder="Amount (ETH)"
                value={milestone.amount}
                onChange={(e) => {
                  const updatedMilestones = [...milestones];
                  updatedMilestones[index].amount = e.target.value;
                  setMilestones(updatedMilestones);
                }}
                required
              />
            </div>
          ))}
          <Button type="button" variant="outline" onClick={handleAddMilestone}>
            <Plus className="mr-2 h-4 w-4" /> Add Milestone
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Project...
              </>
            ) : (
              "Create Project"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default ProjectForm;
