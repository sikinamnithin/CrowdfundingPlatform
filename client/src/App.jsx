import { Separator } from "@/components/ui/separator";
import ContributeForm from "./ContributeForm";
import ProjectDetails from "./ProjectDetails";
import ProjectForm from "./ProjectForm";
import VoteForm from "./VoteForm";

function App() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <ContributeForm />
      <Separator className="my-8" />
      <ProjectDetails />
      <Separator className="my-8" />
      <ProjectForm />
      <Separator className="my-8" />
      <VoteForm />
    </div>
  );
}

export default App;
