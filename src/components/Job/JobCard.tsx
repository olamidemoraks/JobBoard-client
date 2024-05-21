import { Company, Job } from "@/type/types";
import { IoPeople, IoCheckmarkCircle, IoChevronForward } from "react-icons/io5";
import moment from "moment";
import { useQuery } from "react-query";
import { getSavedJobs } from "@/app/apiQuery";
import { currency, frequently } from "@/utils/constant";
import { HiBookmark, HiOutlineBookmark } from "react-icons/hi";
import { BsBuildings } from "react-icons/bs";
import Image from "next/image";
import { useRouter } from "next/router";

type JobCardProps = {
  Job: Job & Company;
  isSaved: boolean;
  handleCompanyModel: (cid: string, jid: string) => void;
  handleJobModel: (cid: string, jid: string) => void;
  handleSaveOrUnsaveJob: (JId: string) => void;
};

// £¥
const JobCard: React.FC<JobCardProps> = ({
  Job,
  handleSaveOrUnsaveJob,
  handleCompanyModel,
  isSaved,
  handleJobModel,
}) => {
  const { data: savedJobs, isLoading } = useQuery("saved", getSavedJobs);

  const getToApplyLink = () => {
    const companyBtn = document.createElement("a");
    companyBtn.href = Job?.Url ?? Job?.ApplyLink;
    companyBtn.target = "_blank";
    companyBtn.rel = "noopener noreferrer";
    companyBtn.click();
  };
  return (
    <div className=" bg-gradient-to-t to-gray-200/70 via-white from-[#fff] w-full min-h-[200px] shadow-sm p-4 flex flex-col gap-6 rounded-md border border-gray-300">
      <div
        className="flex gap-3 cursor-pointer group"
        onClick={() => {
          if (Job?.isFeatured) {
            getToApplyLink();
          } else {
            handleCompanyModel(Job?.CId ?? "", Job?._id);
          }
        }}
      >
        {Job?.Logo ? (
          <>
            <div className=" h-12 w-12 min-w-[3rem] rounded-md relative">
              {Job?.isFeatured ? (
                <img
                  loading="lazy"
                  className=" h-full w-full object-cover rounded-md absolute"
                  src={`${Job?.Logo}`}
                  alt="company logo"
                />
              ) : (
                <img
                  loading="lazy"
                  className=" h-full w-full object-cover rounded-md absolute"
                  src={`${process.env.NEXT_PUBLIC_BASEURL}/company/${Job?.Logo}`}
                  alt="company logo"
                />
              )}
            </div>
          </>
        ) : (
          <>
            <div className=" h-12 min-w-[3rem] w-12 rounded-md bg-gray-400 flex items-center justify-center">
              <BsBuildings className=" text-white h-1/2 w-1/2" />
            </div>
          </>
        )}
        <div className="flex flex-col gap-1 w-[90%]">
          <p className=" font-black text-[18px] group-hover:underline">
            {Job?.CompanyName}
          </p>
          <p className=" text-gray-700 text-[14px]">{Job?.CompanySnippet}</p>
          {Job?.CompanySize && (
            <div className="flex text-neutral-400 font-semibold items-center gap-1 uppercase text-[11px]">
              <IoPeople />
              <p>{Job?.CompanySize.split(" to ").join("-")} Employees</p>
            </div>
          )}
        </div>

        <IoChevronForward />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 bg-green-600/20 text-green-900 p-[3px] px-2 rounded-[30px] text-xs items-center uppercase w-max">
          <IoCheckmarkCircle className=" text-base" />{" "}
          <p className="font-bold text-[10px]">actively hiring</p>
        </div>
        <div className=" border border-gray-200 p-3 flex md:flex-row flex-col justify-between rounded-[4px]">
          <div
            className="flex md:flex-row flex-col flex-1 flex-wrap gap-[2px]  cursor-pointer text-[14px]"
            onClick={() => handleJobModel(Job?.CId ?? "", Job?._id)}
          >
            <div className=" flex md:items-center md:gap-2 gap-1 md:flex-row flex-col">
              <p className=" capitalize text-[15px] font-black  ">
                {Job?.Title}
              </p>
              <div className="flex gap-3 flex-wrap mr-2">
                {Job?.Skills?.map((skill, idx) => (
                  <p
                    className="text-[12px] text-gray-600 bg-gray-200 rounded-[9px] px-2"
                    key={idx}
                  >
                    {skill.split("AND").join(", ")}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex gap-[2px] md:flex-row flex-col md:items-center capitalize">
              <p className="text-black/80 text-[13px] font-semibold">
                {Job?.frequency && (
                  <span>{frequently[Job?.frequency] ?? Job?.frequency}: </span>
                )}
                {Job?.currency && (
                  <>
                    {currency[Job?.currency] === "N" ? (
                      <span>&#8358;</span>
                    ) : (
                      currency[Job?.currency]
                    )}
                  </>
                )}
                {Job?.PayMax && Job?.PayMin ? (
                  <>
                    {Job?.PayMin?.toLocaleString()} •
                    {currency[Job?.currency] === "N" ? (
                      <span>&#8358;</span>
                    ) : (
                      currency[Job?.currency]
                    )}
                    {Job?.PayMax?.toLocaleString()}
                  </>
                ) : null}
              </p>

              {Job?.isRemote && <p className="text-black/80"> • Remote</p>}
              {(Job?.Address || Job?.Location) && (
                <p className="text-black/80">
                  • {Job?.Location} {Job?.Address}
                </p>
              )}
            </div>
          </div>
          <div className="flex md:flex-row flex-col md:items-center gap-2 justify-end">
            <p className="text-[11px] font-bold text-green-700 uppercase">
              {`Posted ${moment(Job?.createdAt).fromNow()}`}
            </p>
            <div className="flex gap-2 w-full justify-end md:w-max text-[14px] ">
              <>
                {Job?.published ? null : (
                  <button
                    className="px-2 py-2 border-gray-300 border rounded-[4px] hover:border-blue-800 hover:text-blue-800 group w-max h-max"
                    onClick={() => handleSaveOrUnsaveJob(Job?._id)}
                  >
                    {isSaved ? (
                      <HiBookmark className=" text-[18px] " />
                    ) : (
                      <HiOutlineBookmark className=" text-[18px] " />
                    )}
                  </button>
                )}
              </>
              <button
                className="px-2 py-2 bg-black text-white rounded-[4px] md:w-max w-full hover:bg-blue-800 "
                onClick={() => handleJobModel(Job?.CId ?? "", Job?._id)}
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default JobCard;
