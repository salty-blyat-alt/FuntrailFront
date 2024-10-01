import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/app/components/ui/breadcrumb"; 

const HotelBreadcrumb = ({ id }: { id: string }) => {
  return (
    <Breadcrumb className="mb-4 text-sm">
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Hotels</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">All guest houses</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Cambodia</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Kratie Province</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Kratie</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        {/* Dynamically insert the hotel details link based on the ID */}
        <BreadcrumbLink href={`/hotel-detail/id=${id}`}>
          Le Tonle (Guesthouse), Kratie (Cambodia) Deals
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default HotelBreadcrumb;
