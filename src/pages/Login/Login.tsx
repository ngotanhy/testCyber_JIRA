import React, { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { string, object } from "yup";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/configStore";
import {
  ACCESS_TOKEN,
  CURRENT_USER,
  getStoreJSON,
  http,
  setStoreJSON,
  USER_LOGIN,
} from "../../utils/setting";


interface userLogin {
  email: string;
  password: string;
}

interface user{
  id: number|string,
  email: string,
  avatar: string,
  name: string,
  accessToken: string
}

type Props = {};

function Login({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const schema = object({
    email: string().required("Tài khoản không được để trống"),
    password: string().required("Mật khẩu không được để trống"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userLogin>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async (values: userLogin) => {
    let userLogin = await http.post("/Users/signin", values);
    console.log(userLogin.data.content)
    await setStoreJSON(USER_LOGIN, userLogin.data);
    await setStoreJSON(ACCESS_TOKEN,userLogin.data.content.accessToken)
    if (userLogin) {
      navigate(`/`);
    }
  });

  useEffect(() => {
    let userLogin = getStoreJSON(USER_LOGIN);
    if (userLogin) {
      navigate("/");
    }
  }, []);

  return (
    <form onSubmit={onSubmit} className="cont">
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "2%",
          padding: "9px 12px",
        }}
        onClick={() => {
          navigate("/");
        }}
        className="text-lg cursor-pointer transition-all hover:-translate-y-2 text-white font-medium rounded-full bg-primary"
      >
        Trang chủ
      </div>
      <div className="demo">
        <div className="login">
          <div className="login__check" />
          <div className="login__form">
            <div className="login__row">
              <svg className="login__icon name svg-icon" viewBox="0 0 20 20">
                <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8" />
              </svg>
              <input
                type="email"
                {...register("email")}
                className="login__input name focus:ring-0"
                placeholder="Username"
              />
              {errors.email && (
                <p className="text-red-500 text-md italic  text-left mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="login__row">
              <svg className="login__icon pass svg-icon" viewBox="0 0 20 20">
                <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
              </svg>
              <input
                type="password"
                {...register("password")}
                className="login__input pass focus:ring-0"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-md italic text-left mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button type="submit" className="login__submit">
              Đăng nhập
            </button>
            <p className="login__signup">
              Vui lòng đăng kí? &nbsp;
              <a onClick={() => navigate("/register")}>Đăng kí</a>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

export default  memo(Login)