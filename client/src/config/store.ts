import {action, computed, observable} from "mobx";
import {Component} from "react";
import {StoreProps, StoreType} from "../store";

class Store {
    @observable auth: AuthInfo = {
        logged: true,
        username: "IE Jesus Maestro",
        admin: false
    };
    @observable teachers: Teacher[] = [{id: 1, name: "Jose Padilla"}];
    @observable studyAreas: StudyArea[] = observable([
        {id: 1, name: "Humanidades", bossId: 1},
        {id: 2, name: "Ciencias", bossId: 1},
        {id: 3, name: "Etica y valores", bossId: 1},
    ]);
    @observable subjects: Subject[] = [{id: 1, name: "Ciencias Sociales", hours: 4, areaId: 1}];

    @computed get isLogged(): boolean {
        return this.auth.logged;
    }

    @computed get isUnlogged(): boolean {
        return !this.auth.logged;
    }

    @computed get teachersSearchHash(): Hash<Teacher> {
        const result: Hash<Teacher> = {};
        this.teachers.forEach((teacher) => result[teacher.id.toString()] = teacher);
        return result;
    }

    @computed get studyAreasSearchHash(): Hash<StudyArea> {
        const result: Hash<StudyArea> = {};
        this.studyAreas.forEach((area) => result[area.id.toString()] = area);
        return result;
    }

    @computed get subjectsSearchHash(): Hash<Subject> {
        const result: Hash<Subject> = {};
        this.subjects.forEach((subject) => result[subject.id.toString()] = subject);
        return result;
    }

    @action login = (username: string) => {
        this.auth = {username, logged: true, admin: true};
    };

    @action logout = () => this.auth = {username: "", logged: false, admin: false};

    @action updateStudyArea = (area: StudyArea) => {
        const areaRef = this.findArea(area.id);
        if (!areaRef) return;
        areaRef.name = area.name;
        areaRef.bossId = area.bossId;
    };

    @action updateSubject = (subject: Subject) => {
        const subjectRef = this.findSubject(subject.id);
        if (!subjectRef) return;
        subjectRef.name = subject.name;
        subjectRef.hours = subject.hours;
        subjectRef.areaId = subject.areaId;
    };

    @action addStudyArea = (area: StudyArea) => {
        area.id = Math.round(Math.random() * 100);
        this.studyAreas.push({id: area.id, name: area.name, bossId: area.bossId});
    };

    @action addSubject = (subject: Subject) => {
        subject.id = Math.round(Math.random() * 100);
        this.subjects.push({id: subject.id, name: subject.name, hours: subject.hours, areaId: subject.areaId});
    };

    findArea = (id: number): StudyArea => this.studyAreas.find((area) => area.id === id);
    findSubject = (id: number): Subject => this.subjects.find((subject) => subject.id === id);
}

class WithStore<P = {}, S = {}> extends Component<P & StoreProps, S> {
    get store(): StoreType {
        return this.props.store!!;
    }
}

const store = new Store();
export {store, WithStore};
