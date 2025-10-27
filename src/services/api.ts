// src/services/api.ts
import { api } from "boot/axios";
import type { ApiResponse } from "src/types/api";

export const ApiService = {
  async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    const { data } = await api.get<ApiResponse<T>>(url, { params });
    return data;
  },

  async post<T>(url: string, body?: any): Promise<ApiResponse<T>> {
    const { data } = await api.post<ApiResponse<T>>(url, body);
    return data;
  },

  async put<T>(url: string, body?: any): Promise<ApiResponse<T>> {
    const { data } = await api.put<ApiResponse<T>>(url, body);
    return data;
  },

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    const { data } = await api.delete<ApiResponse<T>>(url);
    return data;
  },

  async upload<T>(
    url: string,
    files: File | File[],
    extraData: Record<string, any> = {},
    onProgress?: (percent: number) => void,
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();

    if (Array.isArray(files)) {
      files.forEach((file, i) => formData.append(`files[${i}]`, file));
    } else {
      formData.append("file", files);
    }

    for (const key in extraData) {
      formData.append(key, extraData[key]);
    }

    const { data } = await api.post<ApiResponse<T>>(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          onProgress(percent);
        }
      },
    });

    return data;
  },

  async download(
    url: string,
    params?: Record<string, any>,
    filename?: string,
  ): Promise<void> {
    const response = await api.get(url, {
      params,
      responseType: "blob",
    });

    const contentDisposition = response.headers["content-disposition"];
    const suggestedFilename =
      filename ||
      (contentDisposition &&
        contentDisposition.split("filename=")[1]?.replace(/"/g, "")) ||
      "downloaded-file";

    const blob = new Blob([response.data]);
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = suggestedFilename;
    link.click();
    window.URL.revokeObjectURL(link.href);
  },
};
