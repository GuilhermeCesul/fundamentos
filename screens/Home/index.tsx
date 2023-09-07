import { Alert, FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { Participants } from '../../components/Participants';
import { useState } from 'react';

export default function Home() {

    //const participants = ['Gabriel 1', 'Gabriel 2', 'Gabriel 3', 'Gabriel 4', 'Eduardo 1', 'Eduardo 2']
    const [participants, setParticipants] = useState<String[]>([]);

    const [participantName, setParticipantName] = useState('')

    function handleParticipanteAdd() {

        if (participantName.trim().length > 0) {

            if (participants.includes(participantName)) {

                setParticipantName('');
                return Alert.alert('Problema', ' => Participante já existe!')
            }

            setParticipants([...participants, participantName.trimStart()]);
            setParticipantName('')
        } else {
            Alert.alert('Problema ao adicionar participante', ' => Nome está vazio')
        }
    }

    function handleParticipanteRemove(name: String) {

        Alert.alert(
            'Remover',
            `Deseja remover o participante ${name}`,
            //Cria um array do tipo objeto que vai agrupar os botões criados na barra
            [
                //cria o primeiro objeto que funcionará como o botão 'Sim'
                {
                    text: 'Sim',
                    onPress: () => setParticipants(prevState => prevState.filter(partic => partic != name)) //Executa a função ao clicar (onPress) no botão 'Sim'
                                                                                                            //prevState é o estado atual da lista
                                                                                                            //A função filtra (filter) a lista e procura por nomes diferentes
                                                                                                            //do nome passado na função (partic => partic != name), ao filtrar
                                                                                                            //salva os nomes diferentes encontrados no estado atual da lista
                                                                                                            
                },
                //cria o segundo objeto que funcionará como o botão 'Não'
                {
                    text: 'Não',
                    style: 'cancel' //Estilo padrão relacionado ao cancelamento de uma ação
                }
            ]
        )
    }

    return (

        <View style={styles.container} >
            <Text style={styles.title} >Nome do Grupo</Text>
            <Text style={styles.data} >Quarta, 09 de agosto</Text>

            <View style={styles.form} >
                <TextInput style={styles.input}
                placeholder='Informe um participante'
                placeholderTextColor={'#FFF'}
                onChangeText={setParticipantName}
                value = {participantName} />

                <TouchableOpacity style={styles.button} onPress={handleParticipanteAdd} >
                    <Text style={styles.textButton} >+</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.title} >Participantes</Text>

            {/* <ScrollView>
                {
                    participants.map(participant => (
                        <Participants key={participant} name={participant} onRemove={handleParticipanteRemove} />
                    ))
                }
            </ScrollView> */}

            <FlatList
                data={participants}
                keyExtractor={item => item}
                renderItem={({item}) => (<Participants key={item} name= {item} onRemove={() => handleParticipanteRemove(item)}/>)}
                ListEmptyComponent={() => <Text style={styles.listEmpty} >Sem participantes</Text>}
                showsVerticalScrollIndicator={false} />

            {/*
            <Participants name="Gabriel 1" onRemove={handleParticipanteRemove} />
            <Participants name="Gabriel 2" onRemove={handleParticipanteRemove} />
            <Participants name="Gabriel 3" onRemove={handleParticipanteRemove} />
            <Participants name="Gabriel 4" onRemove={handleParticipanteRemove} />
            <Participants name="Eduardo 1" onRemove={handleParticipanteRemove} />
            <Participants name="Eduardo 2" onRemove={handleParticipanteRemove} />
            */}
        </View>
    )
}
