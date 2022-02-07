import cachiosLib, { CachiosInstance, CachiosRequestConfig } from "cachios";
import axiosLib, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Arpeggios } from "./../index";
import { ArpeggiosInstance } from "types/arpeggios";

interface ArpeggiosStaticProps {
  axios?: AxiosInstance;
  cachios?: CachiosInstance;
  axiosRequestConfig?: AxiosRequestConfig;
}

export class ArpeggiosStatic {
  create({
    axios,
    axiosRequestConfig,
    cachios,
  }: ArpeggiosStaticProps = {}): ArpeggiosInstance {
    const axiosInstance = axios ? axios : axiosLib.create(axiosRequestConfig);
    const cachiosInstance = cachios
      ? cachios
      : cachiosLib.create(axiosInstance);

    const arpeggiosInstance = Arpeggios(cachiosInstance);

    return arpeggiosInstance;
  }
}
