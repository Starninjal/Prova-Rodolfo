/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, useFieldArray } from 'react-hook-form';
import { createUser } from '../../Services/UserService';
import { UserData } from '../../Interfaces/UserData';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, Button } from 'react-bootstrap';

const UserForm = () => {
    const { register, handleSubmit, control, watch } = useForm<UserData>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "lstAddresses"
    });

    // Observa o valor do campo de URL da foto (sem necessidade de tipagem explícita)
    const photoUrl = watch('foto') || ''; // Fallback para string vazia se estiver indefinido

    const onSubmit = async (data: UserData) => {
        console.log(data);
        try {
            const response = await createUser(data);
            console.log(response.data)
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="mb-4">Dados do Usuário</h2>
                <div className="mb-3">
                    <label className="form-label">Nome: </label>
                    <input className="form-control" type="text" {...register("name")} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email: </label>
                    <input className="form-control" type="email" {...register("email")} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Senha: </label>
                    <input className="form-control" type="password" {...register("senha")} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Unidade: </label>
                    <input className="form-control" type="text" {...register("unidade")} required />
                </div>

                <div className="mb-4">
                    <label className="form-label">Tipo de Perfil: </label>
                    <select className="form-select" {...register("tipoPerfil.tipo")} required>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="form-label">Nível de Acesso: </label>
                    <select className="form-select" {...register("tipoPerfil.nivelAcesso")} required>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>

                {/* Campo para URL da foto de perfil */}
                <div className="mb-4 d-flex align-items-center">
                    <div>
                        <label className="form-label">URL da Foto: </label>
                        <input className="form-control" type="text" {...register("foto")} />
                    </div>
                    {/* Exibe a imagem redonda se a URL for válida */}
                    {photoUrl && (
                        <div className="ms-3">
                            <img 
                                src={photoUrl} 
                                alt="Foto de perfil" 
                                className="rounded-circle" 
                                style={{ width: "100px", height: "100px", objectFit: "cover" }} 
                            />
                        </div>
                    )}
                </div>

                <h2 className="mb-4">Endereços</h2>
                <Accordion defaultActiveKey="0">
                    {fields.map((field, index) => (
                        <Accordion.Item eventKey={`${index}`} key={field.id}>
                            <Accordion.Header>
                                Endereço {index + 1}
                                <Button
                                    variant="danger"
                                    size="sm"
                                    className="ms-2"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Evitar que o accordion seja aberto ao clicar em remover
                                        remove(index);
                                    }}
                                >
                                    Remover
                                </Button>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="mb-3">
                                    <label className="form-label">Rua: </label>
                                    <input className="form-control" type="text" {...register(`lstAddresses.${index}.street` as const)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Número: </label>
                                    <input className="form-control" type="text" {...register(`lstAddresses.${index}.number` as const)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Complemento: </label>
                                    <input className="form-control" type="text" {...register(`lstAddresses.${index}.complement` as const)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Bairro: </label>
                                    <input className="form-control" type="text" {...register(`lstAddresses.${index}.district` as const)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Vizinhança: </label>
                                    <input className="form-control" type="text" {...register(`lstAddresses.${index}.neighborhood` as const)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Cidade: </label>
                                    <input className="form-control" type="text" {...register(`lstAddresses.${index}.city` as const)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Estado: </label>
                                    <input className="form-control" type="text" {...register(`lstAddresses.${index}.state` as const)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">País: </label>
                                    <input className="form-control" type="text" {...register(`lstAddresses.${index}.country` as const)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">CEP: </label>
                                    <input className="form-control" type="text" {...register(`lstAddresses.${index}.zipCode` as const)} required />
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>

                <button
                    type="button"
                    className="btn btn-primary mt-3"
                    onClick={() => append({} as any)}
                >
                    Adicionar Endereço
                </button>

                <button type="submit" className="btn btn-success mt-3">Enviar</button>
            </form>
        </div>
    );
};

export default UserForm;
