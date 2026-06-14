import { useState } from "react";
import { Pencil } from "lucide-react";
import { Header } from "../../components/Header";
import { usePerfilUsuario } from "../../hooks/usePerfilUsuario";
import "./perfil-usuario.css";

export const PerfilUsuario = () => {
  const {
    user,
    form,
    loading,
    saving,
    deleting,
    error,
    success,
    handleChange,
    handleSubmit,
    handleDelete,
  } = usePerfilUsuario();
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);

    if (numbers.length <= 2) {
      return numbers;
    }

    if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }

    if (numbers.length <= 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    }

    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  };

  const onSubmit = async (e: React.FormEvent) => {
    await handleSubmit(e);
    setEditing(false);
  };

  return (
    <>
      <Header />
      <div className="perfil-page">
        <div className="perfil-card">
          <div className="perfil-card__header">
            <div>
              <h1 className="perfil-card__title">Meu perfil</h1>
              <p className="perfil-card__subtitle">
                Visualize e edite suas informações
              </p>
            </div>
            {!loading && !editing && (
              <button
                className="perfil-card__edit-btn"
                onClick={() => setEditing(true)}
                title="Editar perfil"
                type="button"
              >
                <Pencil size={16} strokeWidth={2} />
              </button>
            )}
          </div>

          {loading ? (
            <p className="perfil-loading">Carregando...</p>
          ) : editing ? (
            <form className="perfil-form" onSubmit={onSubmit} noValidate>
              <div className="perfil-form__field">
                <label className="perfil-form__label" htmlFor="name">
                  Nome completo
                </label>
                <input
                  className="perfil-form__input"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="João Silva"
                  value={form.name ?? ""}
                  onChange={handleChange}
                  disabled={saving}
                  required
                />
              </div>

              <div className="perfil-form__field">
                <label className="perfil-form__label" htmlFor="email">
                  E-mail
                </label>
                <input
                  className="perfil-form__input"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email ?? ""}
                  onChange={handleChange}
                  disabled={saving}
                  required
                />
              </div>

              <div className="perfil-form__field">
                <label className="perfil-form__label" htmlFor="telefone">
                  Telefone{" "}
                  <span className="perfil-form__optional">(opcional)</span>
                </label>
                <input
                  className="perfil-form__input"
                  id="telefone"
                  name="telefone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={form.telefone ?? ""}
                  onChange={(e) => {
                    handleChange({
                      ...e,
                      target: {
                        ...e.target,
                        name: "telefone",
                        value: formatPhone(e.target.value),
                      },
                    } as React.ChangeEvent<HTMLInputElement>);
                  }}
                  disabled={saving}
                />
              </div>

              {error && <p className="perfil-form__error">{error}</p>}

              <div className="perfil-form__actions">
                <button
                  className="perfil-form__cancel"
                  type="button"
                  disabled={saving}
                  onClick={() => setEditing(false)}
                >
                  Cancelar
                </button>
                <button
                  className="perfil-form__submit"
                  type="submit"
                  disabled={saving}
                >
                  {saving ? "Salvando..." : "Salvar alterações"}
                </button>
              </div>
            </form>
          ) : (
            <div className="perfil-info">
              {success && (
                <p className="perfil-form__success">
                  Perfil atualizado com sucesso!
                </p>
              )}
              <div className="perfil-info__field">
                <span className="perfil-info__label">Nome completo</span>
                <p className="perfil-info__value">{user?.name}</p>
              </div>
              <div className="perfil-info__field">
                <span className="perfil-info__label">E-mail</span>
                <p className="perfil-info__value">{user?.email}</p>
              </div>
              <div className="perfil-info__field">
                <span className="perfil-info__label">Telefone</span>
                <p className="perfil-info__value">
                  {user?.telefone ? (
                    formatPhone(user.telefone)
                  ) : (
                    <span className="perfil-info__empty">Não informado</span>
                  )}
                </p>
              </div>

              {!confirmDelete ? (
                <button
                  className="perfil-danger-btn"
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                >
                  Deletar conta
                </button>
              ) : (
                <div className="perfil-confirm">
                  <p className="perfil-confirm__text">
                    Tem certeza? Essa ação é irreversível.
                  </p>
                  <div className="perfil-confirm__actions">
                    <button
                      className="perfil-form__cancel"
                      type="button"
                      disabled={deleting}
                      onClick={() => setConfirmDelete(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="perfil-danger-btn perfil-danger-btn--confirm"
                      type="button"
                      disabled={deleting}
                      onClick={handleDelete}
                    >
                      {deleting ? "Deletando..." : "Sim, deletar"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
