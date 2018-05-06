/**
 * All availabel note stati:
 * -------------------------
 * Note: This item is a note
 * ToDo: This item is a ToDo item that has not yet been done
 * Done: This item is a ToDo item that has already been done
 */
enum NoteStatus {
    Note,
    ToDo,
    Done
}

/**
 * A note or a todo item.
 */
export class Note {

    readonly type: string = "note";
    id: string;

    // Text of this note / todo item
    text: string;

    // Current status of this note / todo item
    status: NoteStatus;
}
