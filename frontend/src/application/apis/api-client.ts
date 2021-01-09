
import axios from "axios"
import { Act, ActEntity } from "../domain/act/act";

const mockBaseUrl = "http://localhost:3000/act";
const baseUrl = "";

class ApiClient {

    searchAct = async (query: string) => {
        return axios.get<Act[]>(baseUrl + `searchAct`, {
            params: {
                q: query
            }
        }).then((res) => {
            const result: ActEntity[] = [];
            res.data.forEach(a => {
                result.push(ActEntity.fromJSON(a))
            })
            return result;
        });
    };

    searchMockAct = async (query: string) => {
        console.log(query);
        return axios.get<Act[]>(mockBaseUrl).then((res) => {
            const result: ActEntity[] = [];
            res.data.forEach(a => {
                result.push(ActEntity.fromJSON(a))
            })
            return result;
        });
    }
}

const apiClient = new ApiClient();

export default apiClient;