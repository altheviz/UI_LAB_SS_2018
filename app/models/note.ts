
/**
 * A note or a todo item.
 */
export class Note {

    id: number;

    technician: number;

    type: string;

    title: string;

    description: string;

    creationDate: string;

    status: string;

    wrapText: boolean;

    constructor(id, technician, type, title, description, creationDate, status)	{
        this.id = id;
        this.technician = technician;
        this.type = type;
        this.title = title;
        this.description = description;
        this.creationDate = creationDate;
        this.status = status;
        this.wrapText = false;
    }
}
