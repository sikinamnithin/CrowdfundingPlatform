import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import axios from "axios";
import { Loader2 } from "lucide-react";

function ProjectDetails() {
  const [projectId, setProjectId] = useState("");
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/projects/${projectId}`
      );
      setDetails(response.data.projectDetails);
    } catch (error) {
      alert("Error fetching project details: " + error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchDetails();
    }
  }, [projectId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Get Project Details</CardTitle>
        <CardDescription>View details of a specific project</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Project ID"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            />
            <Button onClick={fetchDetails} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Fetch Details"
              )}
            </Button>
          </div>
          {details && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                Project Title: {details[1]}
              </h3>
              <p>Total Funded: {details[2]} ETH</p>
              <p>Current Milestone: {details[3]}</p>
              <p>Completed: {details[4] ? "Yes" : "No"}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProjectDetails;
