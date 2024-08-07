import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ReadMoreIcon from '@mui/icons-material/ReadMore';

const Card = ({ title, blog, id, date,onDelete, onEdit, onReadMore }) => {


    const handleDelete = async (e) => {
        e.preventDefault();
        if (onDelete) await onDelete(id);
    };

    const handleUpdate = () => {
        if (onEdit) onEdit({ id, title, blog });
    };

    const handleReadMore = () => {
        if (onReadMore) onReadMore({ id, title, blog });
    };

    return (
        <div className="rounded overflow-hidden shadow-lg bg-red-700 h-fit max-w-sm">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-red-200">{title}</div>
                <p className="text-red-300 text-justify text-sm">
                    {blog.length <= 100 ? blog : (blog.substring(0, 100) + '...')}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2 flex justify-between items-center">
                <span className="inline-block rounded-md text-gray-200 text-sm font-semibold mr-2 mb-2">
                    {date}
                </span>
                <div className="buttons flex space-x-2">
                    {onReadMore && (
                        <IconButton aria-label="readMore" onClick={handleReadMore}>
                            <ReadMoreIcon className='text-white hover:text-red-600 hover:bg-red-100 rounded-full' />
                        </IconButton>
                    )}
                    {onEdit && (
                        <IconButton aria-label="update" onClick={handleUpdate}>
                            <TextSnippetIcon className='text-white hover:text-red-600 hover:bg-red-100 rounded-full' />
                        </IconButton>
                    )}
                    {onDelete && (
                        <IconButton aria-label="delete" onClick={handleDelete}>
                            <DeleteIcon className='text-white hover:text-red-600 hover:bg-red-100 rounded-full' />
                        </IconButton>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;
