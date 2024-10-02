import Image from "next/image";
import NotFoundImage from "@/assets/images/404.png";

const NotFound = () => {
  return (
    <section>
      <div className="h-full w-full flex items-center justify-center">
        <Image src={NotFoundImage} alt="NotFoundImage" />
      </div>
    </section>
  );
};
export default NotFound;
