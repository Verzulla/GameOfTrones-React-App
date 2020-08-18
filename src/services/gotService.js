

export default class gotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
            throw new Error (`Could not fetch ${url}, status: ${res.status}`)
        }
    
        return await res.json();
    }

    async getAllCharacters() {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformCharacter);
    }
    async getCharacter(id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    getAllBooks() {
        return this.getResource('/books/');
    }
    getBook(id) {
        return this.getResource(`/books/${id}/`);
    }

    getAllHouses() {
        return this.getResource('/houses/');
    }
    getHouse(id) {
        return this.getResource(`/houses/${id}/`);
    }

    isSet(data) {
        if (data) {
            return data;
        } else {
            return data = 'No data:(';
        }
    }

    _extractId = (item) => {
        const idRegExp = /(\d+)/;
        return item.url.match(idRegExp)[1];
    }

    _transformCharacter = (char) => {
        return {
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture),
            id: this._extractId(char)
        }
    }
    _transformHouse = (house) => {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancesrtalWeapons: house.ancesrtalWeapons
            }
    }
    _transformBook = (book) => {
        return {
            name: book.name,
            numberOfPage: book.numberOfPage,
            publiser: book.publiser,
            reliased: book.reliased
            }
    }
}