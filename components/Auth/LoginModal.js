import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { axiosClient } from "@/client";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/utils/YupSchemas";

import styles from "./LoginModal.module.css";
import CustomOtpInput from "./CustomOtp";
import Image from "next/image";

import { useAuth } from "@/Context/AuthContext";

export default function LoginModal({ isOpen, onClose }) {
  const [step, setStep] = useState("mobile");
  const [code, setCode] = useState("");
  const [mobileState, setMobileState] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const { setMobile } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    let interval;
    if (step === "code" && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      await axiosClient.post("auth/send-otp", { mobile: getValues("mobile") });
      toast.success("کد ارسال شد");
      setStep("code");
      setTimer(60);
    } catch (err) {
      toast.error("ارسال کد با خطا مواجه شد");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOtp = async () => {
    if (code.length < 6) {
      toast.error("کد تایید را کامل وارد کنید");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosClient.post("auth/check-otp", {
        mobile: getValues("mobile"),
        code,
      });

      const { accessToken, refreshToken, user } = res.data;
      Cookies.set("access_token", accessToken, { expires: 7 });
      Cookies.set("refresh_token", refreshToken, { expires: 30 });
      Cookies.set("user_mobile", user.mobile, { expires: 30 });
      setMobile(user.mobile);
      toast.success("ورود با موفقیت انجام شد");
      onClose();
    } catch (err) {
      toast.error("کد وارد شده نادرست است");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitMobile = async () => {
    await handleSendOtp();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.modalBox}>
        {step === "mobile" ? (
          <>
            <button onClick={onClose} className={styles.closeBtn}>
              ×
            </button>
            <form
              onSubmit={handleSubmit(onSubmitMobile)}
              className={styles.form}
            >
              <h2>ورود به تورینو</h2>
              <div className={styles.phoneInput}>
                <p>شماره موبایل خود را وارد کنید :</p>
                <input
                  type="text"
                  placeholder="4253***0912"
                  {...register("mobile", {
                    onChange: (e) => setMobileState(e.target.value),
                  })}
                  className={errors.mobile ? styles.errorInput : undefined}
                />
                {errors.mobile && (
                  <p className={styles.errorText}>{errors.mobile.message}</p>
                )}
              </div>
              <button type="submit" disabled={loading}>
                {loading ? "در حال ارسال..." : "ارسال کد تایید"}
              </button>
            </form>
          </>
        ) : (
          <>
            <button
              className={styles.backBtn}
              onClick={() => setStep("mobile")}
            >
              <Image
                src="/images/left.png"
                alt="back.png"
                width="24"
                height="24"
              />
            </button>
            <div className={styles.otpPart}>
              <h2 className={styles.h2}>کد تایید را وارد کنید.</h2>
              <div className={styles.otp}>
                <h3>کد تایید به شماره {mobileState} ارسال شد</h3>

                <CustomOtpInput length={6} value={code} onChange={setCode} />
                {timer > 0 ? (
                  <div>ارسال مجدد تا {timer} ثانیه دیگر</div>
                ) : (
                  <div onClick={handleSendOtp}>ارسال مجدد کد</div>
                )}
              </div>
              <button onClick={handleCheckOtp} disabled={loading}>
                {loading ? "در حال بررسی..." : "ورود به تورینو"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
