import React, { Component } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { agregarCita } from '../actions/citasActions';
import { mostrarError } from '../actions/errorActions';

class AgregarCita extends Component {

    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    componentWillMount() {
        this.props.mostrarError(false);
    }

    // Refs
    nombreMascotaRef = React.createRef();
    propietarioRef = React.createRef();
    fechaRef = React.createRef();
    horaRef = React.createRef();
    sintomasRef = React.createRef();

    crearNuevaCita = (e) => {
        e.preventDefault();

        const mascota = this.nombreMascotaRef.current.value,
            propietario = this.propietarioRef.current.value,
            fecha = this.fechaRef.current.value,
            hora = this.horaRef.current.value,
            sintomas = this.sintomasRef.current.value;

        if (mascota === '' || propietario === '' || fecha === '' || hora === '' || sintomas === '') {
            this.props.mostrarError(true);
        }
        else {
            const nuevaCita = {
                id: uuid(),
                mascota,
                propietario,
                fecha,
                hora,
                sintomas
            }

            // Se envia el objeto hacia el padre para actualizar el state
            this.props.agregarCita(nuevaCita);

            // Resetear el formulario
            e.currentTarget.reset();

            // Elimina el error si existe
            this.props.mostrarError(false);
        }
    }

    render() {
        const existeError = this.props.error;

        return (
            <div className="card mt-5">
                <div className="card-body">
                    <h2 className="card-title text-center mb-5">Agregar Citas</h2>
                    <form onSubmit={this.crearNuevaCita}>
                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">Nombre Mascota</label>
                            <div className="col-sm-8 col-lg-10">
                                <input type="text" className="form-control" ref={this.nombreMascotaRef} placeholder="Nombre Mascota" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">Nombre Dueño</label>
                            <div className="col-sm-8 col-lg-10">
                                <input type="text" className="form-control" ref={this.propietarioRef} placeholder="Nombre Dueño de la Mascota" />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">Fecha</label>
                            <div className="col-sm-8 col-lg-4  mb-4 mb-lg-0">
                                <input type="date" ref={this.fechaRef} className="form-control" />
                            </div>

                            <label className="col-sm-4 col-lg-2 col-form-label">Hora</label>
                            <div className="col-sm-8 col-lg-4">
                                <input type="time" ref={this.horaRef} className="form-control" />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">Sintomas</label>
                            <div className="col-sm-8 col-lg-10">
                                <textarea className="form-control" ref={this.sintomasRef}></textarea>
                            </div>
                        </div>
                        <div className="form-group row justify-content-end">
                            <div className="col-sm-3">
                                <button type="submit" className="btn btn-success w-100">Agregar</button>
                            </div>
                        </div>
                    </form>
                    {existeError ?
                        <div className="alert alert-danger text-center">
                            Todos los campos son obligatorios</div> : ''}
                </div>
            </div>);
    }
}

AgregarCita.propTypes = {
    agregarCita: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    citas: state.citas.citas,
    error: state.error.error
})

export default connect(mapStateToProps, { agregarCita, mostrarError })(AgregarCita);