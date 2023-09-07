const baseUrl = `${process.env.NEXT_PUBLIC_BASEURL}/api/v1`;
let token: string = "";

if (typeof window !== "undefined") {
  const info = JSON.parse(localStorage.getItem("_profile") as string) ?? {
    token: "",
  };
  token = info.token;
}

export const getProfile = async (): Promise<any> => {
  try {
    const data = await fetch(`${baseUrl}/seeker`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.json();
  } catch (error) {
    console.error("getProfile error", error);
  }
};

export const updateProfile = async ({ data }: any) => {
  try {
    const res = await fetch(`${baseUrl}/seeker`, {
      method: "PATCH",
      body: JSON.stringify({
        ...data,
      }),
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// Employer Routes
export const getCompany = async (): Promise<any> => {
  try {
    const res = await fetch(`${baseUrl}/company`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async ({ data, id }: any) => {
  try {
    await fetch(`${baseUrl}/company/${id}`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({
        ...data,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export const getJobs = async (id: any) => {
  try {
    const res = await fetch(`${baseUrl}/company/jobs/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
export const getJob = async (id: any) => {
  try {
    const res = await fetch(`${baseUrl}/company/jobs/getjob/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
export const updateJob = async ({ values, id }: any) => {
  try {
    const res = await fetch(`${baseUrl}/company/jobs/${id}`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({
        ...values,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteJob = async ({ id }: any) => {
  try {
    const res = await fetch(`${baseUrl}/company/jobs/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// Jobs route

export const getSeachJobs = async (query: any) => {
  console.log("query", query);
  const Title = query.Title ?? "";
  const Address = query.Address ?? "";
  const PayMin = query.PayMin ?? 0;
  const PayMax = query.PayMax ?? 100000;
  const minExperience = query.minExperience ?? "";
  const maxExperience = query.maxExperience ?? "";
  const Skills = query.Skills ?? "";
  const EmploymentType = query.EmploymentType ?? "";
  const isRemote = query.isRemote ?? "";
  try {
    const res = await fetch(
      `${baseUrl}/job/?Title=${Title}&Address=${Address}&PayMin[gte]=${PayMin}&PayMax[lte]=${PayMax}&Experience[gte]=${minExperience}&Experience[lte]=${maxExperience}&Skills=${Skills}&isRemote=${isRemote}&EmploymentType=${EmploymentType}`,
      {
        method: "GET",
      }
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

//same this as get job
export const getMainJob = async (id: any) => {
  try {
    const res = await fetch(`${baseUrl}/job/${id}`, {
      method: "GET",
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyById = async (id: any) => {
  try {
    const res = await fetch(`${baseUrl}/company/allcompany/${id}`, {
      method: "GET",
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

//Saved Job

export const getSavedJobs = async () => {
  try {
    const res = await fetch(`${baseUrl}/saved`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const removeSavedJobs = async ({ id }: any) => {
  try {
    const res = await fetch(`${baseUrl}/saved/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const createSavedJobs = async ({ data }: any) => {
  try {
    const res = await fetch(`${baseUrl}/saved`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        ...data,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

//Logout

export const Logout = async () => {
  try {
    await fetch(`${baseUrl}/auth/logout`, {
      method: "GET",
    });
  } catch (error) {
    console.log(error);
  }
};

//application

export const getUserAppication = async () => {
  try {
    const res = await fetch(`${baseUrl}/job/apply/user-application`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobApplicant = async (JId: any, CId: any) => {
  try {
    const res = await fetch(`${baseUrl}/company/applicant/${JId}/${CId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log;
  }
};

export const getAllCompanyApplicant = async (CId: any) => {
  try {
    const res = await fetch(`${baseUrl}/company/application/${CId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log;
  }
};

export const getApplicant = async (Id: any) => {
  try {
    const res = await fetch(`${baseUrl}/company/getApplicant/${Id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateApplicantStatus = async ({ value, id }: any) => {
  try {
    const data = await fetch(`${baseUrl}/company/applicant/${id}`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({
        Status: value,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//overview

export const getOverview = async (id: string) => {
  try {
    const res = await fetch(`${baseUrl}/overview/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
