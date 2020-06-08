import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, FlatList} from 'react-native';
import api from './services/api';

export default function App() {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        api.get('projects').then(response => {
            //console.log(response.data);
            setProjects(response.data);
        })
    }, [])
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#343e4f"/>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={projects}
                    keyExtractor={project => project._id}
                    renderItem={({item: project}) => (
                        <Text style={styles.nameProject}>{project.title}</Text>
                    )}
                />
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#343e4f',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    nameProject: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: 'bold'
    },
    owner: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold'
    }
});

/***
 * Android com emulador: adb reverse tcp: source tcp: dest
 * Android com emulador: 10.0.2.2. (android studio)
 * Android com dispositivo fisico: ip maquina
 */

