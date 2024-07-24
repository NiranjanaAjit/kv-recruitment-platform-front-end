import apiWithTag from "./baseApi";

const referralApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    referral: builder.query({
      query: (payload) => ({
        url: "/referrals",
        method: "GET",
        body: payload,
      }),
      providesTags: ['REFERRAL_LIST']
    }),
    createReferral: builder.mutation({
      query: (payload) => ({
        url: "/referrals",
        method: "POST",
        body: payload
      }),
      invalidatesTags: ["REFERRAL_LIST"]
    }),
    editReferral: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/referrals/${id}`,
        method: "PUT",
        body: payload
      }),
      invalidatesTags: ["REFERRAL_LIST"]
    }),
    checkReferral: builder.mutation({
      query: (payload) => ({
        url: "/referrals/check",
        method: "POST",
        body: payload
      }),
      invalidatesTags: ["REFERRAL_LIST"]
    })
  }),
});

export const { useReferralQuery, useCreateReferralMutation, useCheckReferralMutation, useEditReferralMutation } = referralApi;
