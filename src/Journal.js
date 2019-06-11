import React from 'react';
import firebase from 'firebase';
import './journal.css';

const db = firebase.firestore();

export default class Journal extends React.Component {
    state = {
        stats1: [],
        user: null,
        sheetName: 'testSheet1',
    }
    journalListeners = [];

    componentDidMount() {
        const currentUser = firebase.auth().currentUser;
        if (!currentUser) {
            return this.props.history.push('/');
        }
        // this.addBoxListener('statBox1');
        this.addStatsListener('stats1');
        this.addStatsListener('attributes');
        // this.addStatsListener('abilities');
        // this.addStatsListener('advantages');
        // this.addStatsListener('renown');
        // this.unsubscribeJournal = db
        //     .collection('users')
        //     .doc(currentUser.uid)
        //     .collection('testSheet1')
        //     .doc('statBox1')
        //     .onSnapshot(snapshot => {
        //         this.setState({
        //             statBox1: snapshot.docs
        //         });
        //     });
        // console.log(this.state.statBox1);
    }

    addStatsListener(statsName)
    {
        const currentUser = firebase.auth().currentUser;
        const statsNameQuery = statsName + 'Query';
        console.log (statsNameQuery);
        const listener = db
        .collection('users')
        .doc(currentUser.uid)
        .collection(this.state.sheetName)
        .doc('statBox1')
        .collection(statsName)
        .orderBy('position')
        .onSnapshot(snapshot => {
            this.setState({
                [statsName]: snapshot.docs
            });
            this.setState({
                [statsNameQuery]: snapshot.query
            });
        });
    }

    addBoxListener(boxName)
    {
        const currentUser = firebase.auth().currentUser;
        const listener = db
        .collection('users')
        .doc(currentUser.uid)
        .collection(this.state.sheetName)
        .doc(boxName)
        .onSnapshot(snapshot => {
            this.setState({
                [boxName]: snapshot
            });
        });
    }


    // Check if the unsubscribeJournal reference exists (could possibly not exist
    // if the !currentUser branch was taken in componentDidMount)
    // This unsubscribe ensures there's not multiple listeners when navigating between pages
    componentWillUnmount() {
        // if (this.unsubscribeJournal) {
        //     this.unsubscribeJournal();
        // }
        this.journalListeners.forEach(unsubscribe => unsubscribe());

    }

    // Sets the input field onChange
    onEntryChange = (event) => {
        const entry = event.target.value;
        const fieldName = event.target.name;
        const dbCollection = db.collection('users').doc(firebase.auth().currentUser.uid)
        .collection('testSheet1')
        .doc('statBox1')
        .collection('stats1');
        dbCollection.doc(fieldName).update({'value': entry});
        this.setState({[fieldName] : entry});
        // console.log(event.target.name);
        // console.log(event.target.value);
    }
    onTextChange = (event) => {
        const entry = event.target.value;
        const fieldName = event.target.name;
        // const dbCollection = db.collection('users').doc(firebase.auth().currentUser.uid)
        // .collection('testSheet1')
        // .doc('statBox1')
        // .collection('stats1');
        // dbCollection.doc(fieldName).update({'value': entry});
        this.setState({[fieldName] : entry});
        console.log(fieldName);
        console.log(this.state[fieldName]);
        
        // console.log(event.target.name);
        // console.log(event.target.value);
    }

    addJournalEntry = (event) => {
        event.preventDefault();
        const dbCollection = db.collection('users').doc(firebase.auth().currentUser.uid)
        .collection('testSheet1')
        .doc('statBox1')
        .collection(this.state.statBoxName);
        dbCollection.doc(this.state.Title).set({'title': this.state.Title}); 
        dbCollection.doc(this.state.Title).update({'value': this.state.Value});
        dbCollection.doc(this.state.Title).update({'position': this.state.Position});
        dbCollection.doc(this.state.Title).update({'type': this.state.Type});
        // Clear the input field
        // this.setState({entry: ''});
        // this.setState({entrya: ''});
    }

    


    render() {
        console.log(this.state.attributes);
        console.log(this.state.stats1);
        const stats1 = this.state.stats1.map(dataBox => {
            return (
                // .id gets the generated id for this object
                <div key={dataBox.id}>
                    {/* .data() gets the object stored - remeber the .value is just the DATA NAME */}
                    {dataBox.data().title}
                    <input name = {dataBox.data().title} onChange = {this.onEntryChange} value = {dataBox.data().value}></input>

                </div>
            );
        });

        // const attributes = this.state.attributes.map(dataBox => {
        //     return (
        //         // .id gets the generated id for this object
        //         <div key={dataBox.id}>
        //             {/* .data() gets the object stored - remeber the .value is just the DATA NAME */}
        //             {dataBox.data().title}
        //             <input name = {dataBox.data().title} onChange = {this.onEntryChange} value = {dataBox.data().value}></input>

        //         </div>
        //     );
        // });
        
        // const abilities = this.state.abilities.map(dataBox => {
        //     return (
        //         // .id gets the generated id for this object
        //         <div key={dataBox.id}>
        //             {/* .data() gets the object stored - remeber the .value is just the DATA NAME */}
        //             {dataBox.data().title}
        //             <input name = {dataBox.data().title} onChange = {this.onEntryChange} value = {dataBox.data().value}></input>

        //         </div>
        //     );
        // });

        // const advantages = this.state.advantages.map(dataBox => {
        //     return (
        //         // .id gets the generated id for this object
        //         <div key={dataBox.id}>
        //             {/* .data() gets the object stored - remeber the .value is just the DATA NAME */}
        //             {dataBox.data().title}
        //             <input name = {dataBox.data().title} onChange = {this.onEntryChange} value = {dataBox.data().value}></input>

        //         </div>
        //     );
        // });

        // const renown = this.state.renown.map(dataBox => {
        //     return (
        //         // .id gets the generated id for this object
        //         <div key={dataBox.id}>
        //             {/* .data() gets the object stored - remeber the .value is just the DATA NAME */}
        //             {dataBox.data().title}
        //             <input name = {dataBox.data().title} onChange = {this.onEntryChange} value = {dataBox.data().value}></input>

        //         </div>
        //     );
        // });

        // const raNoWi = this.state.raNoWi.map(dataBox => {
        //     return (
        //         // .id gets the generated id for this object
        //         <div key={dataBox.id}>
        //             {/* .data() gets the object stored - remeber the .value is just the DATA NAME */}
        //             {dataBox.data().title}
        //             <input name = {dataBox.data().title} onChange = {this.onEntryChange} value = {dataBox.data().value}></input>

        //         </div>
        //     );
        // });

        // const health = this.state.health.map(dataBox => {
        //     return (
        //         // .id gets the generated id for this object
        //         <div key={dataBox.id}>
        //             {/* .data() gets the object stored - remeber the .value is just the DATA NAME */}
        //             {dataBox.data().title}
        //             <input name = {dataBox.data().title} onChange = {this.onEntryChange} value = {dataBox.data().value}></input>

        //         </div>
        //     );
        // });

        // const feraTrib = this.state.feraTrib.map(dataBox => {
        //     return (
        //         // .id gets the generated id for this object
        //         <div key={dataBox.id}>
        //             {/* .data() gets the object stored - remeber the .value is just the DATA NAME */}
        //             {dataBox.data().title}
        //             <input name = {dataBox.data().title} onChange = {this.onEntryChange} value = {dataBox.data().value}></input>

        //         </div>
        //     );
        // });
        
        
        
        
        
        

        return (
            <div>
                <h1>Journal</h1>
                <form onSubmit={this.addJournalEntry}>
                    <label>Box Name</label>
                    <input name="statBoxName" onChange={this.onTextChange} value={this.state.statBoxName} />
                    <label>Title</label>
                    <input name = "Title" onChange={this.onTextChange} value={this.state.addTitle} />
                    <label>Value</label>
                    <input name = "Value" onChange={this.onTextChange} value={this.state.addValue} />
                    <label>Position</label>
                    <input name = "Position" onChange={this.onTextChange} value={this.state.addPosition} />
                    <label>Type</label>
                    <input name = "Type" onChange={this.onTextChange} value={this.state.addType} />

                    <button type="submit">Add</button>
                </form>

                <div className = "wrapper">
                    {stats1}
                    {/* {attributes}
                    {abilities}
                    {advantages}
                    {renown} */}
                </div>
            </div>
        )
    }
}