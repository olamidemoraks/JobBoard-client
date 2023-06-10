import { FiSearch } from "react-icons/fi";
import images from "../../../public/images/update.png";
type EmptyProps = {
  text?: string;
  imageName?: string;
};

const Empty: React.FC<EmptyProps> = ({
  text = "Nothing to see here",
  imageName = "./images/update.png",
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[400px] h-[400px]">
        <img
          loading="lazy"
          src={imageName}
          alt="empty"
          className="w-full h-full object-contain grayscale"
        />
      </div>
      <p className=" text-2xl font-bold text-gray-400">{text}</p>
    </div>
  );
};
export default Empty;
