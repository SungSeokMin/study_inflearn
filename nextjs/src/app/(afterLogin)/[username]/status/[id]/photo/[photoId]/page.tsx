import HomePage from "@/app/(afterLogin)/home/page";
import PhotoModal from "@/app/(afterLogin)/@modal/(.)[username]/status/[id]/photo/[photoId]/page";

interface Props {
  params: {
    username: string;
    id: string;
    photoId: string;
  };
}

const page = ({ params }: Props) => {
  return (
    <>
      <HomePage />
      <PhotoModal params={params} />
    </>
  );
};

export default page;
