import * as yup from "yup";

export const loginSchema = yup.object().shape({
  mobile: yup
    .string()
    .required("شماره موبایل الزامی است")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
});


// Validation schemas for profile
export const personalInfoSchema = yup.object().shape({
  firstName: yup.string().required("نام الزامی است"),
  lastName: yup.string().required("نام خانوادگی الزامی است"),
  nationalCode: yup
    .string()
    .matches(/^\d{10}$/, "کدملی باید 10 رقمی باشد")
    .required("کدملی الزامی است"),
  gender: yup.string().oneOf(["male", "female"]).required("جنسیت الزامی است"),
  birthDate: yup.string().required("تاریخ تولد الزامی است"),
});

export const accountInfoSchema = yup.object().shape({
  mobile: yup.string().required("موبایل الزامی است"),
  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
});

export const bankInfoSchema = yup.object().shape({
  shaba_code: yup.string().required("شماره شبا الزامی است"),
  debitCard_code: yup.string().required("شماره کارت الزامی است"),
  accountIdentifier: yup.string().required("شماره حساب الزامی است"),
});