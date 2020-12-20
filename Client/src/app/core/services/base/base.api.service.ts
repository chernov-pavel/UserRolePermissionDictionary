import {BaseEndpointUrls} from '../../../shared/models/base-endpoint-urls.model';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PageRequest} from '../../../shared/models/page-request';
import {BaseModel} from '../../../shared/models/base-model.model';

export abstract class BaseApiService<TModel extends BaseModel> {
    protected apiUrl: string = "http://localhost:8080/api/";
    protected abstract controllerName: string;
    protected abstract baseEndpointUrls: BaseEndpointUrls;

    protected constructor(protected httpClient: HttpClient) {
    }

    getAll<PageResponse>(pageRequest: PageRequest): Observable<PageResponse> {
        const url = `${this.apiUrl}${this.controllerName}${this.baseEndpointUrls.getAllEndpointName}?page=${pageRequest.page}&size=${pageRequest.size}`;
        return this.httpClient.get<PageResponse>(url);
    }

    getById<TModel>(id: number): Observable<TModel> {
        return of({} as TModel);
    }

    add<TModel>(name: string): Observable<TModel> {
        const url = `${this.apiUrl}${this.controllerName}${this.baseEndpointUrls.addEndpointName}`;
        return this.httpClient.post<TModel>(url, { name: name });
    }

    deleteById<TModel>(id: string): Observable<any> {
        const url = `${this.apiUrl}${this.controllerName}${this.baseEndpointUrls.deleteByIdEndpointName}/${id}`;
        return this.httpClient.delete(url);
    }
}
