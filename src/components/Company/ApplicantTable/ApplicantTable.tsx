import { Application } from "@/type/types";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getAllCompanyApplicant, updateApplicantStatus } from "@/app/apiQuery";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ThemeProvider, createTheme } from "@mui/material";
import StatusBar from "./StatusBar";
import StageMenu from "@/components/Company/Applicant/StageMenu";
import { HiArrowsExpand, HiChevronDown } from "react-icons/hi";
import moment from "moment";
import useProfileColor from "@/hooks/useProfileColor";
import Link from "next/link";

type ApplicantTableProps = {
  isLoading: boolean;
  company?: any;
};

const colorPallete = [
  "bg-purple-500",
  "bg-orange-500",
  "bg-rose-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-gray-500",
  "bg-slate-500",
];

const ProfileIcon = ({ params }: { params: any }) => {
  const { bgColor } = useProfileColor({ colorPallete });

  return (
    <div
      className={`w-full h-full ${bgColor} text-white flex items-center justify-center rounded-full text-xs`}
    >
      <p>
        {params.value.split(" ")[0].substring(0, 1)}
        {params.value.split(" ")[1].substring(0, 1)}
      </p>
    </div>
  );
};

const ApplicantTable: React.FC<ApplicantTableProps> = ({
  isLoading,
  company,
}) => {
  const [applicantId, setApplicantId] = useState("");

  const queryClient = useQueryClient();
  const mutation = useMutation(updateApplicantStatus, {
    onSettled: () => {
      queryClient.invalidateQueries("applications");
    },
  });

  const MuiTheme = createTheme({
    palette: {
      mode: "light",
    },
  });
  const { data: applications, isLoading: applicationsLoading } = useQuery<
    Application[]
  >(
    "applications",
    async () => {
      return getAllCompanyApplicant(company._id);
    },
    {
      enabled: !!company?._id,
      refetchOnReconnect: true,
    }
  );

  const updateStatus = (value: string) => {
    if (!applicantId) {
      return;
    }
    mutation.mutate({ value, id: applicantId });
    setApplicantId("");
  };

  const column = [
    {
      field: "Name",
      headerName: "Candidate Name",
      flex: 1,
      renderCell: (params: any) => {
        return (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full ">
              {!params.row.Photo ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_BASEURL}/profile/${params.row.Photo}`}
                  alt="photo"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <ProfileIcon params={params} />
              )}
            </div>
            <p className=" font-medium text-dark-green ">{params.value}</p>
          </div>
        );
      },
    },
    {
      field: "Status",
      headerName: "Stages",
      flex: 0.7,
      renderCell: (params: any) => {
        return (
          <div
            className="flex flex-col py-2"
            onClick={() => setApplicantId(params.row._id)}
          >
            <StageMenu Status={params.value} updateStatus={updateStatus}>
              <p className=" font-medium text-dark-green flex gap-1 items-center">
                Screening <HiChevronDown className=" text-[18px]" />
              </p>
            </StageMenu>
            <StatusBar status={params.value} />
          </div>
        );
      },
    },
    {
      field: "Title",
      headerName: "Job Role",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Application Date",
      flex: 0.5,
      renderCell: (params: any) => {
        return <p>{moment(params.value).format("DD/MM/YYYY")}</p>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      flex: 0.5,
      renderCell: (params: any) => {
        return (
          <div className="">
            <Link
              href={`/employee/job/applicant/${params.row._id}`}
              className=" h-7 w-7 rounded-md bg-indigo-200 flex items-center justify-center"
            >
              <HiArrowsExpand className="text-indigo-500 text-xl hover:text-[23px] ease-out duration-200 " />
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <div className="mb-5">
        <p className=" text-2xl font-medium text-dark-green ">
          {applications?.length}{" "}
          {applications?.length === (1 || 0) ? "Candidate" : "Candidates"}
        </p>
      </div>
      <ThemeProvider theme={MuiTheme}>
        <DataGrid
          sx={{
            border: "1px solid #5c5c5c16",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#fff",
              color: "#1f342b",
              fontWeight: "bold !important",
              mb: "10px",
              borderBottom: "1px solid #3737374c",
            },

            "& .MuiDataGrid-cell": {
              color: `#1f342b !important`,
              py: "20px",
              borderBottom: "1px solid #5c5c5c16",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#fff",
              color: "#1f342b",
              border: "none",
            },
            "& .MuiTablePagination-root": {
              color: `#1f342b !important`,
            },
            "& .MuiButtonBase-root": {
              color: `#1f342b !important`,
            },
          }}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 20 },
            },
          }}
          pageSizeOptions={[20, 40, 80]}
          getRowId={(row) => row._id}
          style={{ width: "100%", minHeight: "87vh" }}
          loading={isLoading || applicationsLoading}
          rows={(applications || []) as any}
          columns={column}
        />
      </ThemeProvider>
    </div>
  );
};
export default ApplicantTable;
