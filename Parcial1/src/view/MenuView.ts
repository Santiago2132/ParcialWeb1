export default class MenuView {
    public render(): void {
        const app = document.getElementById("calculator");
        const div = document.createElement("div");
        div.innerHTML = `
        `
        app?.appendChild(div);
    }
}