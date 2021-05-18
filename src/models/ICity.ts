import IBaseObject from "./IBaseObject";

interface ICity extends IBaseObject {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
}

export default ICity;