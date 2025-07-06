import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { fetchUser, updateUserProfile } from "@/services/api";
import { toast } from "react-toastify";
import styles from "./UserProfileInfo.module.css";
import { ClipLoader } from "react-spinners";
import Image from "next/image";

const personalInfoSchema = yup.object().shape({
  firstName: yup.string().required("نام الزامی است"),
  lastName: yup.string().required("نام خانوادگی الزامی است"),
  nationalCode: yup
    .string()
    .matches(/^\d{10}$/, "کدملی باید 10 رقمی باشد")
    .required("کدملی الزامی است"),
  gender: yup.string().oneOf(["male", "female"]).required("جنسیت الزامی است"),
  birthDate: yup.string().required("تاریخ تولد الزامی است"),
});

const accountInfoSchema = yup.object().shape({
  mobile: yup.string().required("موبایل الزامی است"),
  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
});

const bankInfoSchema = yup.object().shape({
  shaba_code: yup.string().required("شماره شبا الزامی است"),
  debitCard_code: yup.string().required("شماره کارت الزامی است"),
  accountIdentifier: yup.string().required("شماره حساب الزامی است"),
});

export default function UserProfileInfo() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSection, setEditingSection] = useState(null);

  const {
    register: registerPersonal,
    handleSubmit: handlePersonalFormSubmit,
    reset: resetPersonal,
    formState: { errors: personalErrors },
  } = useForm({
    resolver: yupResolver(personalInfoSchema),
  });

  const {
    register: registerAccount,
    handleSubmit: handleAccountFormSubmit,
    reset: resetAccount,
    formState: { errors: accountErrors },
  } = useForm({
    resolver: yupResolver(accountInfoSchema),
  });

  const {
    register: registerBank,
    handleSubmit: handleBankFormSubmit,
    reset: resetBank,
    formState: { errors: bankErrors },
  } = useForm({
    resolver: yupResolver(bankInfoSchema),
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchUser();
        setUserData(data);
        resetForms(data);
      } catch (err) {
        toast.error("خطا در دریافت اطلاعات کاربر");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const resetForms = (data) => {
    resetPersonal({
      firstName: data.firstName,
      lastName: data.lastName,
      nationalCode: data.nationalCode?.toString(),
      gender: data.gender,
      birthDate: data.birthDate,
    });
    resetAccount({
      mobile: data.mobile,
      email: data.email,
    });
    resetBank({
      shaba_code: data.payment?.shaba_code,
      debitCard_code: data.payment?.debitCard_code,
      accountIdentifier: data.payment?.accountIdentifier,
    });
  };

  const refreshUser = async () => {
    const updated = await fetchUser();
    setUserData(updated);
    resetForms(updated);
  };

  const onPersonalSubmit = async (data) => {
    try {
      await updateUserProfile(data);
      toast.success("اطلاعات شخصی با موفقیت به‌روزرسانی شد");
      setEditingSection(null);
      await refreshUser();
    } catch (err) {
      toast.error("خطا در به‌روزرسانی اطلاعات شخصی");
    }
  };

  const onAccountSubmit = async (data) => {
    try {
      await updateUserProfile(data);
      toast.success("اطلاعات حساب با موفقیت به‌روزرسانی شد");
      setEditingSection(null);
      await refreshUser();
    } catch (err) {
      toast.error("خطا در به‌روزرسانی اطلاعات حساب");
    }
  };

  const onBankSubmit = async (data) => {
    try {
      await updateUserProfile({ payment: data });
      toast.success("اطلاعات بانکی با موفقیت به‌روزرسانی شد");
      setEditingSection(null);
      await refreshUser();
    } catch (err) {
      toast.error("خطا در به‌روزرسانی اطلاعات بانکی");
    }
  };

  const handleCancel = () => {
    resetForms(userData);
    setEditingSection(null);
  };

  const display = (value) => (value === "string" || value === "" ? "-" : value);

  if (isLoading) return <ClipLoader />;
  if (!userData) return <p>اطلاعاتی یافت نشد</p>;

  return (
    <div className={styles.profileBox}>
      {/* Account Information */}
      <div className={styles.accountInfos}>
        <h3>
          اطلاعات حساب کاربری
          {editingSection !== "account" && (
            <button
              onClick={() => setEditingSection("account")}
              className={styles.editBtn}
            >
              <Image
                alt="edit.png"
                src="/images/edit-2.png"
                width={16}
                height={16}
              />
              ویرایش اطلاعات
            </button>
          )}
        </h3>

        {editingSection === "account" ? (
          <form
            className={styles.form}
            onSubmit={handleAccountFormSubmit(onAccountSubmit)}
          >
            <div className={styles.formOptions}>
              <span className={styles.mobileNum}>
                شماره موبایل: <span>{display(userData.mobile)}</span>
              </span>
              <label>
                <input
                  {...registerAccount("email")}
                  defaultValue={userData.email}
                  placeholder="آدرس ایمیل"
                />
                {accountErrors.email && (
                  <p className={styles.error}>
                    {accountErrors.email.message}
                  </p>
                )}
              </label>
            </div>
            <div className={styles.formActions}>
              <button type="submit">ذخیره</button>
              <button type="button" onClick={handleCancel}>
                انصراف
              </button>
            </div>
          </form>
        ) : (
          <div>
            <span>
              شماره موبایل: <span>{display(userData.mobile)}</span>
            </span>
            <span>
              ایمیل: <span>{display(userData.email)}</span>
            </span>
          </div>
        )}
      </div>

      {/* Personal Information */}
      <div className={styles.userInfos}>
        <h3>
          اطلاعات شخصی
          {editingSection !== "personal" && (
            <button
              onClick={() => setEditingSection("personal")}
              className={styles.editBtn}
            >
              <Image
                alt="edit.png"
                src="/images/edit-2.png"
                width={16}
                height={16}
              />
              ویرایش اطلاعات
            </button>
          )}
        </h3>

        {editingSection === "personal" ? (
          <form
            className={styles.form}
            onSubmit={handlePersonalFormSubmit(onPersonalSubmit)}
          >
            <div className={styles.formOptions}>
              <label>
                <input
                  {...registerPersonal("firstName")}
                  defaultValue={userData.firstName}
                  placeholder="نام"
                />
                {personalErrors.firstName && (
                  <p className={styles.error}>
                    {personalErrors.firstName.message}
                  </p>
                )}
              </label>
              <label>
                <input
                  {...registerPersonal("lastName")}
                  defaultValue={userData.lastName}
                  placeholder="نام خانوادگی"
                />
                {personalErrors.lastName && (
                  <p className={styles.error}>
                    {personalErrors.lastName.message}
                  </p>
                )}
              </label>
              <label>
                <input
                  {...registerPersonal("nationalCode")}
                  defaultValue={userData.nationalCode}
                  placeholder="کد ملی"
                />
                {personalErrors.nationalCode && (
                  <p className={styles.error}>
                    {personalErrors.nationalCode.message}
                  </p>
                )}
              </label>
              <label>
                <select
                  {...registerPersonal("gender")}
                  defaultValue={userData.gender}
                  placeholder="جنسیت"
                >
                  <option value="male">مرد</option>
                  <option value="female">زن</option>
                </select>
                {personalErrors.gender && (
                  <p className={styles.error}>
                    {personalErrors.gender.message}
                  </p>
                )}
              </label>
              <label>
                <input
                  {...registerPersonal("birthDate")}
                  defaultValue={userData.birthDate}
                  placeholder="تاریخ تولد"
                />
                {personalErrors.birthDate && (
                  <p className={styles.error}>
                    {personalErrors.birthDate.message}
                  </p>
                )}
              </label>
            </div>
            <div className={styles.formActions}>
              <button type="submit">ذخیره</button>
              <button type="button" onClick={handleCancel}>
                انصراف
              </button>
            </div>
          </form>
        ) : (
          <div>
            <span>
              نام و نام خانوادگی:{" "}
              <span>
                {display(userData.firstName)} {display(userData.lastName)}
              </span>
            </span>
            <span>
              کدملی: <span>{display(userData.nationalCode)}</span>
            </span>
            <span>
              جنسیت:{" "}
              <span>
                {display(
                  userData.gender === "male"
                    ? "مرد"
                    : userData.gender === "female"
                    ? "زن"
                    : "-"
                )}
              </span>
            </span>
            <span>
              تاریخ تولد: <span>{display(userData.birthDate)}</span>
            </span>
          </div>
        )}
      </div>

      {/* Bank Information */}
      <div className={styles.bankInfos}>
        <h3>
          اطلاعات حساب بانکی
          {editingSection !== "bank" && (
            <button
              onClick={() => setEditingSection("bank")}
              className={styles.editBtn}
            >
              <Image
                alt="edit.png"
                src="/images/edit-2.png"
                width={16}
                height={16}
              />
              ویرایش اطلاعات
            </button>
          )}
        </h3>

        {editingSection === "bank" ? (
          <form
            className={styles.form}
            onSubmit={handleBankFormSubmit(onBankSubmit)}
          >
            <div className={styles.formOptions}>
              <label>
                <input
                  {...registerBank("shaba_code")}
                  defaultValue={userData.payment?.shaba_code}
                  placeholder="شماره شبا"
                />
                {bankErrors.shaba_code && (
                  <p className={styles.error}>
                    {bankErrors.shaba_code.message}
                  </p>
                )}
              </label>
              <label>
                <input
                  {...registerBank("debitCard_code")}
                  defaultValue={userData.payment?.debitCard_code}
                  placeholder="شماره کارت"
                />
                {bankErrors.debitCard_code && (
                  <p className={styles.error}>
                    {bankErrors.debitCard_code.message}
                  </p>
                )}
              </label>
              <label>
                {" "}
                <input
                  {...registerBank("accountIdentifier")}
                  defaultValue={userData.payment?.accountIdentifier}
                  placeholder="شماره حساب"
                />
                {bankErrors.accountIdentifier && (
                  <p className={styles.error}>
                    {bankErrors.accountIdentifier.message}
                  </p>
                )}
              </label>
            </div>
            <div className={styles.formActions}>
              <button type="submit">ذخیره</button>
              <button type="button" onClick={handleCancel}>
                انصراف
              </button>
            </div>
          </form>
        ) : (
          <div>
            <span>
              شماره شبا: <span>{display(userData.payment?.shaba_code)}</span>
            </span>
            <span>
              شماره کارت:{" "}
              <span>{display(userData.payment?.debitCard_code)}</span>
            </span>
            <span>
              شماره حساب:{" "}
              <span>{display(userData.payment?.accountIdentifier)}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
