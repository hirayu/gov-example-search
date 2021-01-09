import { BaseEntity } from "../base/base-entity"

export type Act = {
    id: string;
    actName: string;
    article: number;
    paragraph: number;
    content: string;
}

export class ActEntity extends BaseEntity {
    id: string;
    actName: string;
    article: number;
    paragraph: number;
    content: string;

    constructor(values: Act) {
        super();
        this.id = values.id;
        this.actName = values.actName;
        this.article = values.article;
        this.paragraph = values.paragraph;
        this.content = values.content;
    }

    static fromJSON(values: Act) {
        return new ActEntity(values);
    }
}