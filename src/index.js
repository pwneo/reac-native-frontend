import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, FlatList, TouchableOpacity, View, Button} from 'react-native';
import api from './services/api';

export default function App() {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        api.get('projects').then(response => {
            //console.log(response.data);
            setProjects(response.data);
        })
    }, [])

    function handlerAddProject() {
        api.post('projects', {
            title: 'Projeto Teste',
            owner: 'Paulo W. A. Ferreira',
            createdAt: Date.now()
        }).then(response => {
            setProjects([...projects, response.data]);
            console.log('Id do projeto criado: ', response.data._id);
        });
    }

    function handlerRemoveProject(id) {
        console.log('Id do projeto pra ser removido: ', id);
        api.delete(`projects/${id}`).then(response => {
            const index = projects.findIndex(project => project._id === id);
            if (index < 0){
                return;
            }
            projects.splice(index, 1);
            setProjects([...projects]);
        })
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#343e4f"/>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={projects}
                    keyExtractor={project => project._id}
                    renderItem={({item: project}) => (
                        <>
                            <Text style={styles.nameProject}>{project.title}</Text>
                            <Text style={styles.owner}>{project.owner}</Text>
                            <TouchableOpacity onPress={() => handlerRemoveProject(project._id)}>
                                <Text style={styles.remove}>Remover</Text>
                            </TouchableOpacity>
                            <Text/>
                        </>
                    )}
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.button}
                    onPress={handlerAddProject}
                >
                    <Text style={styles.buttonText}>Adicionar Projeto</Text>
                </TouchableOpacity>
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
        fontSize: 20,
        fontWeight: 'bold'
    },
    owner: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    remove: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#fff',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#343e4f',
        fontSize: 16
    }
});

/***
 * Android com emulador: adb reverse tcp: source tcp: dest
 * Android com emulador: 10.0.2.2. (android studio)
 * Android com dispositivo fisico: ip maquina
 */

