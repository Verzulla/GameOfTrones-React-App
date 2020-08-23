export default class gotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
            throw new Error (`Could not fetch ${url}, status: ${res.status}`)
        }
    
        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformCharacter);
    }
    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    getAllBooks = async () => {
        const res = await this.getResource('/books/');
        return res.map(this._transformBook);
    }
    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }

    getAllHouses = async () => {
        const res = await this.getResource('/houses?page=5&pageSize=10');
        return res.map(this._transformHouse);
    }
    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
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
            ancesrtalWeapons: house.ancesrtalWeapons,
            id: this._extractId(house)
            }
    }
    _transformBook = (book) => {
        return {
            name: book.name,
            numberOfPage: book.numberOfPage,
            publiser: book.publiser,
            reliased: book.reliased,
            id: this._extractId(book)
            }
    }
}