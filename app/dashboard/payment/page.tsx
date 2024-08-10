"use client";
import {
  useCreatePaymentMutation,
  useGetPaymentsQuery,
  useGetPlayersQuery,
} from "@/public/utils/authApi";
import Modal from "./__components/Modal";
import React, { useState, useMemo } from "react";
import { Check } from "lucide-react";
import useRouter from "next/router/navigation";

const PlayersPage = () => {
  const router = useRouter();
  const { data: players = [], isLoading } = useGetPlayersQuery();
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [showPaymentsTodayModal, setShowPaymentsTodayModal] =
    useState<boolean>(false);
  const [showPaymentHistoryModal, setShowPaymentHistoryModal] =
    useState<boolean>(false);
  const [showAllPaymentsModal, setShowAllPaymentsModal] =
    useState<boolean>(false); // State for all payments history modal
  const [createPayment] = useCreatePaymentMutation();
  const { data: payments } = useGetPaymentsQuery();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handlePayment = async () => {
    if (selectedPlayer) {
      try {
        await createPayment({
          playerId: selectedPlayer._id,
          session: new Date().toISOString(),
          amount: 100, // Replace with the amount as needed
        }).unwrap();
        alert("Payment made successfully!");
        setShowPaymentModal(false);
      } catch (error) {
        console.error("Payment failed:", error);
      }
    }
  };

  const paymentsToday = payments?.filter(
    (payment: any) =>
      new Date(payment?.session).toDateString() === new Date().toDateString()
  );

  // Filter players based on the search term
  const filteredPlayers = useMemo(() => {
    return players?.filter((player: any) =>
      player.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [players, searchTerm]);

  // Filter payment history for the selected player
  const paymentHistory = useMemo(() => {
    return payments?.filter(
      (payment: any) => payment?.player?._id === selectedPlayer?._id
    );
  }, [payments, selectedPlayer]);

  // Determine if a player has paid today
  const hasPaidToday = (playerId: string) => {
    return paymentsToday?.some(
      (payment: any) => payment?.player?._id === playerId
    );
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {/* Search Input */}
      <div className="flex items-center flex-wrap gap-4">
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <input
            type="text"
            className="w-[ "
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <kbd className="kbd kbd-sm">⌘</kbd>
          <kbd className="kbd kbd-sm">K</kbd>
        </label>

        {/* Button to show today's payments */}
        <button
          className="btn btn-primary mb-4"
          onClick={() => setShowPaymentsTodayModal(true)}
        >
          View Payments for Today
        </button>

        {/* Button to view payment history */}
        <button
          className="btn btn-secondary mb-4"
          onClick={() => setShowPaymentHistoryModal(true)}
          disabled={!selectedPlayer}
        >
          View Payment History
        </button>

        {/* Button to view all payments history */}
        <button
          className="btn btn-tertiary mb-4"
          onClick={() => router.push("/dashboard/payment/allpaymenthistory")} // Navigate to the new page
        >
          View All Payments History
        </button>
      </div>

      {/* Table of players */}
      {isLoading && <p>Loading...</p>}
      <div className="w-[calc(100vw-10px)] md:w-auto overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name </th>
              <th>Club</th>
              <th>Phone Number</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((player: any) => (
              <tr onClick={() => setSelectedPlayer(player)} key={player._id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={player?.photo}
                          alt={`Avatar of ${player.username}`}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{player?.username}</div>
                    </div>
                  </div>
                </td>
                <td>{player?.club?.name}</td>
                <td>{player?.phoneNumber}</td>
                <th>
                  {hasPaidToday(player._id) ? (
                    <button className="btn btn-success btn-xs" disabled>
                      Paid Today
                    </button>
                  ) : (
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => {
                        setSelectedPlayer(player);
                        setShowPaymentModal(true);
                      }}
                    >
                      Make Payment
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Name </th>
              <th>Club</th>
              <th>Phone Number</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPlayer && (
        <Modal onClose={() => setShowPaymentModal(false)}>
          <h2>{selectedPlayer.username}</h2>
          <p>Club: {selectedPlayer.club?.name}</p>
          <p>Phone Number: {selectedPlayer.phoneNumber}</p>
          <button onClick={handlePayment} className="btn btn-primary">
            Make Payment
          </button>
        </Modal>
      )}

      {/* Payments Today Modal */}
      {showPaymentsTodayModal && (
        <Modal onClose={() => setShowPaymentsTodayModal(false)}>
          <h2>Payments for Today</h2>
          <ul>
            {paymentsToday?.length > 0 ? (
              paymentsToday?.map((payment: any) => (
                <li key={payment?._id}>
                  {payment?.player.username} - ${payment?.amount}
                </li>
              ))
            ) : (
              <li>No payments made today</li>
            )}
          </ul>
        </Modal>
      )}

      {/* Payment History Modal */}
      {showPaymentHistoryModal && selectedPlayer && (
        <Modal onClose={() => setShowPaymentHistoryModal(false)}>
          <h2>Payment History for {selectedPlayer.username}</h2>
          <ul>
            {paymentHistory?.length > 0 ? (
              paymentHistory?.map((payment: any) => (
                <li key={payment?._id}>
                  {new Date(payment?.session).toLocaleDateString()} -{" "}
                  <Check size={20} color="green" />
                </li>
              ))
            ) : (
              <li>No payment history available</li>
            )}
          </ul>
        </Modal>
      )}

      {/* All Payments History Modal */}
      {showAllPaymentsModal && (
        <Modal onClose={() => setShowAllPaymentsModal(false)}>
          <h2>All Payments History</h2>
          <ul>
            {payments?.length > 0 ? (
              payments?.map((payment: any) => (
                <li key={payment?._id}>
                  {payment?.player.username} - ${payment?.amount} -{" "}
                  {new Date(payment?.session).toLocaleDateString()}
                </li>
              ))
            ) : (
              <li>No payment history available</li>
            )}
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default PlayersPage;
