import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 'landing',
  businessInfo: {
    businessName: '',
    businessType: '',
    yearsOperating: '',
    annualRevenue: '',
    address: '',
    phone: '',
    email: '',
  },
  financialInfo: {
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    taxId: '',
  },
  selectedTerms: null,
  applicationId: null,
  isSubmitting: false,
  errors: {},
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setStep(state, { payload }) {
      state.currentStep = payload;
    },
    updateBusinessInfo(state, { payload }) {
      state.businessInfo = { ...state.businessInfo, ...payload };
    },
    updateFinancialInfo(state, { payload }) {
      state.financialInfo = { ...state.financialInfo, ...payload };
    },
    setSelectedTerms(state, { payload }) {
      state.selectedTerms = payload;
    },
    setApplicationId(state, { payload }) {
      state.applicationId = payload;
    },
    setSubmitting(state, { payload }) {
      state.isSubmitting = payload;
    },
    setErrors(state, { payload }) {
      state.errors = payload;
    },
    resetApplication(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setStep,
  updateBusinessInfo,
  updateFinancialInfo,
  setSelectedTerms,
  setApplicationId,
  setSubmitting,
  setErrors,
  resetApplication,
} = applicationSlice.actions;

export const selectCurrentStep = (state) => state.application.currentStep;
export const selectBusinessInfo = (state) => state.application.businessInfo;
export const selectFinancialInfo = (state) => state.application.financialInfo;
export const selectSelectedTerms = (state) => state.application.selectedTerms;
export const selectApplicationId = (state) => state.application.applicationId;
export const selectIsSubmitting = (state) => state.application.isSubmitting;
export const selectErrors = (state) => state.application.errors;

export default applicationSlice.reducer;