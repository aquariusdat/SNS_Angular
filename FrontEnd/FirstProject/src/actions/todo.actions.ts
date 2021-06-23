export class MockData {
    public async getTodos() {
        const res = await fetch('https://localhost:44332/api/v1/todos');
        const data = await res.json();
        return data;
    }
}