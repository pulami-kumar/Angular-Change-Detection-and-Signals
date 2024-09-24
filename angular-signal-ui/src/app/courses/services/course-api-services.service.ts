import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../../core/common/api-resonse.model";
import { Environment } from "../../core/environment/environment.development";
import { Course } from "../models/course.model";

@Injectable({
    providedIn: 'root'
})

export class CourseApiServices{
    private readonly baseCourseApiUrl: string = `${Environment.BaseApiUrl}/course`;

    constructor(private httpClient: HttpClient) {}

    fetchAllCourses(): Observable<ApiResponse<Course[]>>{
        const apiUrl = `${this.baseCourseApiUrl}/getAllCourses`;
        return this.httpClient.get<ApiResponse<Course[]>>(apiUrl);
    }

    fetchCourseById(id: string): Observable<ApiResponse<Course>>{
        const apiUrl = `${this.baseCourseApiUrl}/getCourseById/${id}`;
        return this.httpClient.get<ApiResponse<Course>>(apiUrl);
    }

    createCourse(newCourse: Partial<Course>): Observable<ApiResponse<null>>{
        const apiUrl = `${this.baseCourseApiUrl}/createCourse`;
        return this.httpClient.post<ApiResponse<null>>(apiUrl, newCourse);
    }

    updateCourse(updatedCourse: Partial<Course>): Observable<ApiResponse<null>>{
        const apiUrl = `${this.baseCourseApiUrl}/updateCourse`;
        return this.httpClient.put<ApiResponse<null>>(apiUrl, updatedCourse);
    }
    
    deleteCourse(id: string): Observable<ApiResponse<null>>{
        const apiUrl = `${this.baseCourseApiUrl}/deleteCourse/${id}`;
        return this.httpClient.delete<ApiResponse<null>>(apiUrl);
    }
}