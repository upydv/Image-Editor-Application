import React from 'react';
import Upload from './Upload';
import Header from './Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Enhance()
{
    return(
        <div>
            <Header/>
        </div>
    )
}

export default Enhance;