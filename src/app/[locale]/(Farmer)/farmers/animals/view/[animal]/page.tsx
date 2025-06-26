import { DashContent, DashContenTitle } from "@/components/DashCrudContent";
import ViewAnimal from "@/components/local/animal/view";

// Correctly typing the params object for dynamic routes
export interface PageProps {
  params: Promise<{
    animal: string;
  }>;

}

export default async function Animal({ params }: PageProps) {
  return (
    <DashContent>
      <DashContenTitle>Animal</DashContenTitle>
      <div className="mb-5"></div>
      <ViewAnimal animal={Number((await params).animal)}/>
      {/* <UpdateAdmin admin={Number((await params).admin)} /> */}
    </DashContent>
  );
}