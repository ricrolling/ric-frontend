import { ChangeEvent, MouseEventHandler, useState } from 'react';
import { RollupCreateRequest } from '../types';

export const RollupCreationModal = ({
  id,
  onSubmit,
}: {
  id: string;
  onSubmit: (data: RollupCreateRequest) => void;
}) => {
  const [createRequest, setCreateRequest] = useState<RollupCreateRequest>({
    name: '',
    config: '',
    chainId: 0,
  });

  const onInputChange =
    (fieldName: keyof RollupCreateRequest) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setCreateRequest((prev) => ({
        ...prev,
        [fieldName]: event.target.value,
      }));
    };
  const onSubmitClick = () => {
    if (createRequest.chainId !== 0 && createRequest.name) {
      onSubmit({ ...createRequest });

      const modalControl = (
        window as typeof window & { id: { close: () => void } }
      )[id as keyof typeof window];
      if (modalControl) {
        modalControl.close();
      }

      setCreateRequest({ chainId: 0, name: '', config: '' });
    }
  };

  const closeWithoutSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const modalControl = (
      window as typeof window & { id: { close: () => void } }
    )[id as keyof typeof window];
    if (modalControl) {
      modalControl.close();
    }
  };
  return (
    <dialog id={id} className="modal">
      <form method="dialog" className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={closeWithoutSubmit}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg">Create a new rollup!</h3>
        <p className="py-4">Fill in the details for your new rollup!</p>

        {/* Forms */}
        <div className="flex flex-col items-center">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              required
              type="text"
              placeholder="MyRollup"
              className="input input-bordered w-full max-w-xs"
              onChange={onInputChange('name')}
              value={createRequest?.name}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Chain ID</span>
            </label>
            <input
              required
              type="number"
              placeholder="12132"
              className="input input-bordered w-full max-w-xs"
              onChange={onInputChange('chainId')}
              value={createRequest?.chainId}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Additional Config</span>
            </label>
            <input
              type="text"
              placeholder='{"genesis": "0"}'
              className="input input-bordered w-full max-w-xs"
              onChange={onInputChange('config')}
              value={createRequest?.config}
            />
          </div>
        </div>

        <div className="modal-action">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-primary" onClick={onSubmitClick}>
            Submit
          </button>
        </div>
      </form>
    </dialog>
  );
};
