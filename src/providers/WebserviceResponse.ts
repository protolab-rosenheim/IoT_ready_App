interface WebserviceResponse<T> {
    num_results: number;
    objects: T[];
    page: number;
    total_pages: number;
}
