import http from "../http-common";
import {User, UserList} from "../interfaces/user"

class UserService {
  getAll() {
    return http.get<Array<UserList>>("/Users");
  }

  get(id: string) {
    return http.get<User>(`/Users/${id}`);
  }

  create(data: User) {
    return http.post<User>("/Users", data);
  }

  update(data: User, id: any) {
    return http.put<any>(`/Users/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/Users/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/Users`);
  }
}

export default new UserService();
