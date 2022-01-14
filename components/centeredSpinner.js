import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from '../styles/CenteredSpinner.module.css';

export default function CenteredSpinner() {
    return <div className={styles.centeredSpinner}>
        <Spinner animation="border" />
    </div>;
} 