import { DashContenTitle } from "@/components/DashCrudContent";
import CreateAnimalForm from "@/components/local/animal/CreateAnimalForm"; 
import DashSection from "@/components/Section/Section";

export default function Create() {
    return (
        <DashSection>
            <DashContenTitle>Create Animal</DashContenTitle>
            <div className="mb-5"></div>
            <CreateAnimalForm />
        </DashSection>
    )
}