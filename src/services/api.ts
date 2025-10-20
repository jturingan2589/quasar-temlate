// src/services/api.ts
import { api } from 'boot/axios'

export const ApiService = {
  /**
   * GET request
   */
  async get<T>(url: string, params?: any): Promise<T> {
    const { data } = await api.get(url, { params })
    return data
  },

  /**
   * POST request
   */
  async post<T>(url: string, body?: any): Promise<T> {
    const { data } = await api.post(url, body)
    return data
  },

  /**
   * PUT request
   */
  async put<T>(url: string, body?: any): Promise<T> {
    const { data } = await api.put(url, body)
    return data
  },

  /**
   * DELETE request
   */
  async delete<T>(url: string): Promise<T> {
    const { data } = await api.delete(url)
    return data
  },

  /**
   * FILE UPLOAD (multipart/form-data)
   */
  async upload<T>(
    url: string,
    files: File | File[],
    extraData: Record<string, any> = {},
    onProgress?: (percent: number) => void
  ): Promise<T> {
    const formData = new FormData()

    // Handle single or multiple files
    if (Array.isArray(files)) {
      files.forEach((file, i) => formData.append(`files[${i}]`, file))
    } else {
      formData.append('file', files)
    }

    // Append extra fields
    for (const key in extraData) {
      formData.append(key, extraData[key])
    }

    const { data } = await api.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          onProgress(percent)
        }
      },
    })

    return data
  },

  /**
   * FILE DOWNLOAD (Blob)
   */
  async download(
    url: string,
    params?: Record<string, any>,
    filename?: string
  ): Promise<void> {
    const response = await api.get(url, {
      params,
      responseType: 'blob', // Important: get binary data
    })

    // Extract filename from header if not provided
    const contentDisposition = response.headers['content-disposition']
    const suggestedFilename =
      filename ||
      (contentDisposition &&
        contentDisposition.split('filename=')[1]?.replace(/"/g, '')) ||
      'downloaded-file'

    // Create Blob and trigger browser download
    const blob = new Blob([response.data])
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = suggestedFilename
    link.click()
    window.URL.revokeObjectURL(link.href)
  },
}
