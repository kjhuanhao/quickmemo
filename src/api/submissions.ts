import { request } from './request'

export const getSubmissionsReq = (): Promise<SubmissionEntity[]> => {
  return request.get('/submissions')
}
