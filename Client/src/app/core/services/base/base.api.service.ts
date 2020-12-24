import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PageRequest} from '../../../shared/models/page-request.model';
import {BaseModel} from '../../../shared/models/base-model.model';

export abstract class BaseApiService<TBaseModel extends BaseModel, TPagedModel, TCreateModel, TUpdateModel> {
    protected apiUrl: string = "http://localhost:8080/api/";
    protected abstract controllerName: string;

    protected constructor(protected httpClient: HttpClient) {
    }

    getAll(): Observable<TBaseModel[]> {
        const url = `${this.apiUrl}${this.controllerName}`;
        return this.httpClient.get<TBaseModel[]>(url);
    }

    get(pageRequest: PageRequest): Observable<TPagedModel> {
        const url = `${this.apiUrl}${this.controllerName}/paginated?page=${pageRequest.page}&size=${pageRequest.size}`;
        return this.httpClient.get<TPagedModel>(url);
    }

    getById(id: string): Observable<TBaseModel> {
        const url = `${this.apiUrl}${this.controllerName}/${id}`;
        return this.httpClient.get<TBaseModel>(url);
    }

    create(createModel: TCreateModel): Observable<TBaseModel> {
        const url = `${this.apiUrl}${this.controllerName}/create`;
        return this.httpClient.post<TBaseModel>(url, createModel);
    }

    deleteById(id: string): Observable<any> {
        const url = `${this.apiUrl}${this.controllerName}/${id}/delete`;
        return this.httpClient.delete(url);
    }

    update(id: string, newModel: TUpdateModel): Observable<TBaseModel> {
        const url = `${this.apiUrl}${this.controllerName}/${id}/update`;
        return this.httpClient.put<TBaseModel>(url, newModel);
    }
}
