import { ChangeEvent, MouseEventHandler, useState } from 'react';
import { RollupCreateRequest } from '../types';

export const RollupCreationModal = ({
  isLoading,
  onSubmit,
}: {
  isLoading: boolean;
  onSubmit: (data: RollupCreateRequest) => void;
}) => {
  const [createRequest, setCreateRequest] = useState<RollupCreateRequest>({
    name: '',
    config: '',
    chainId: 0,
  });
  const [isNotComplete, setIsNotComplete] = useState<{
    name: boolean;
    chainId: boolean;
  }>({
    name: false,
    chainId: false,
  });

  const onInputChange =
    (fieldName: keyof RollupCreateRequest) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setCreateRequest((prev) => ({
        ...prev,
        [fieldName]: event.target.value,
      }));
    };
  const onSubmitClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    setIsNotComplete({ chainId: false, name: false });
    e.preventDefault();
    if (createRequest.chainId !== 0 && createRequest.name) {
      await onSubmit({ ...createRequest });
      const modalControl = (
        window as typeof window & { rollup_creation: { close: () => void } }
      ).rollup_creation;
      if (modalControl) {
        modalControl.close();
      }

      setCreateRequest({ chainId: 0, name: '', config: '' });
    } else {
      if (!createRequest.chainId && !createRequest.name) {
        setIsNotComplete({ chainId: true, name: true });
      } else if (!createRequest.chainId) {
        setIsNotComplete({ chainId: true, name: false });
      } else if (!createRequest.name) {
        setIsNotComplete({ chainId: false, name: true });
      }
    }
  };

  const closeWithoutSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const modalControl = (
      window as typeof window & { rollup_creation: { close: () => void } }
    ).rollup_creation;
    if (modalControl) {
      modalControl.close();
    }
  };
  return (
    <dialog id="rollup_creation" className="modal">
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
              type="text"
              placeholder="MyRollup"
              className={
                isNotComplete.name
                  ? 'input input-error input-bordered w-full max-w-xs'
                  : 'input input-bordered w-full max-w-xs'
              }
              onChange={onInputChange('name')}
              value={createRequest?.name}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Chain ID</span>
            </label>
            <input
              type="number"
              placeholder="12132"
              className={
                isNotComplete.chainId
                  ? 'input input-error input-bordered w-full max-w-xs'
                  : 'input input-bordered w-full max-w-xs'
              }
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
          {isLoading ? (
            <button
              className="btn btn-disabled btn-neutral"
              onClick={(e) => e.preventDefault()}
            >
              Submitting
              <span className="loading loading-spinner"></span>
            </button>
          ) : (
            <button className="btn btn-primary" onClick={onSubmitClick}>
              Submit
            </button>
          )}
        </div>
      </form>
    </dialog>
  );
};
